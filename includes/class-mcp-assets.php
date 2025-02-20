<?php
/**
 * Class to handle assets loading and company data
 */
class MCP_Assets {
    /**
     * Constructor
     */
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_action('wp_enqueue_scripts', array($this, 'localize_map_data'), 20);
    }

    /**
     * Enqueue Leaflet assets and the custom map script
     */
    public function enqueue_assets() {
        // Enqueue plugin CSS
        wp_enqueue_style('mcp-styles', MCP_PLUGIN_URL . 'assets/css/mcp-styles.css', array(), MCP_VERSION);
        
        // Font Awesome (for map icons)
        wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css', array(), '6.7.2');
        wp_enqueue_script('font-awesome-js', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/js/all.min.js', array(), '6.7.2', true);

        // Leaflet CSS and JS
        wp_enqueue_style('leaflet-css', 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css', array(), '1.9.3');
        wp_enqueue_script('leaflet-js', 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js', array(), '1.9.3', true);

        // MarkerCluster Plugin
        wp_enqueue_style('leaflet-markercluster-css', 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css', array(), '1.5.3');
        wp_enqueue_style('leaflet-markercluster-default-css', 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css', array(), '1.5.3');
        wp_enqueue_script('leaflet-markercluster-js', 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js', array('leaflet-js'), '1.5.3', true);

        // Custom Map JS
        wp_enqueue_script('mcp-custom-map', MCP_PLUGIN_URL . 'assets/js/mcp-map.js', array('leaflet-js', 'leaflet-markercluster-js'), MCP_VERSION, true);
    }

    /**
     * Query companies and pass sanitized latitude and longitude data to JavaScript
     */
    public function localize_map_data() {
        $companies_data = $this->get_companies_data();
        
        // Pass the companies data to the JavaScript file
        wp_localize_script('mcp-custom-map', 'mcpCompanies', $companies_data);
    }

    /**
     * Get company data with sanitized values
     *
     * @return array
     */
    private function get_companies_data() {
        $companies_data = array();

        $args = array(
            'post_type'      => 'companies',
            'posts_per_page' => -1,
        );

        $companies_query = new WP_Query($args);

        if ($companies_query->have_posts()) {
            while ($companies_query->have_posts()) {
                $companies_query->the_post();

                $company_data = $this->prepare_company_data(get_the_ID());
                
                if ($company_data) {
                    $companies_data[] = $company_data;
                }
            }
            wp_reset_postdata();
        }

        return $companies_data;
    }

    /**
     * Prepare company data with proper sanitization
     *
     * @param int $post_id
     * @return array|null
     */
    private function prepare_company_data($post_id) {
        $latitude  = get_field('latitude', $post_id);
        $longitude = get_field('longitude', $post_id);
        
        // Sanitize the values
        $lat_sanitized = sanitize_text_field($latitude);
        $lng_sanitized = sanitize_text_field($longitude);

        // Convert to floats
        $lat = floatval($lat_sanitized);
        $lng = floatval($lng_sanitized);

        // Validate the coordinates
        if ($lat >= -90 && $lat <= 90 && $lng >= -180 && $lng <= 180) {
            return array(
                'lat'       => $lat,
                'lng'       => $lng,
                'title'     => esc_html(get_the_title($post_id)),
                'phone'     => esc_html(get_field('phonenumber', $post_id)),
                'address'   => esc_html(get_field('address', $post_id)),
                'email'     => esc_html(get_field('email', $post_id)),
                'website'   => esc_url(get_field('website', $post_id)),
                'facebook'  => esc_url(get_field('facebook', $post_id)),
                'instagram' => esc_url(get_field('instagram', $post_id)),
                'linkedin'  => esc_url(get_field('linkedin', $post_id)),
                'district'  => esc_html(get_field('district', $post_id)),
                'business_sector' => esc_html(get_field('business_sector', $post_id)),
                // 'thumbnail' => esc_url(get_the_post_thumbnail_url($post_id, 'medium')),
            );
        }

        return null;
    }
}
