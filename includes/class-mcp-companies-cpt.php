<?php
/**
 * Class to handle the Companies Custom Post Type
 */
class MCP_Companies_CPT {
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', array($this, 'register_companies_cpt'));
    }

    /**
     * Register the Companies Custom Post Type
     */
    public function register_companies_cpt() {
        $labels = array(
            'name'               => __('Companies', 'my-companies-plugin'),
            'singular_name'      => __('Company', 'my-companies-plugin'),
            'add_new'            => __('Add New Company', 'my-companies-plugin'),
            'add_new_item'       => __('Add New Company', 'my-companies-plugin'),
            'edit_item'          => __('Edit Company', 'my-companies-plugin'),
            'new_item'           => __('New Company', 'my-companies-plugin'),
            'view_item'          => __('View Company', 'my-companies-plugin'),
            'search_items'       => __('Search Companies', 'my-companies-plugin'),
            'not_found'          => __('No companies found', 'my-companies-plugin'),
            'not_found_in_trash' => __('No companies found in Trash', 'my-companies-plugin'),
            'all_items'          => __('All Companies', 'my-companies-plugin'),
        );

        $args = array(
            'labels'      => $labels,
            'public'      => true,
            'has_archive' => true,
            'rewrite'     => array('slug' => 'companies'),
            'supports'    => array('title', 'thumbnail'),
            // 'show_in_rest' => true, // Uncomment if using the REST API.
        );

        register_post_type('companies', $args);
    }
}
