<?php
/**
 * Class to handle the map shortcode
 */
class MCP_Shortcode {
    /**
     * Constructor
     */
    public function __construct() {
        add_shortcode('companies_map', array($this, 'companies_map_shortcode'));
    }

    /**
     * Shortcode callback to output the map container
     *
     * @return string
     */
    public function companies_map_shortcode() {
        ob_start();
        ?>
        <div id="mcp-map-container">
            <!-- Search and Filters -->
            <div id="mcp-filters">
                <input type="text" id="mcp-search" placeholder="Search companies...">
                <select id="mcp-district-filter">
                    <option value="">Filter by District</option>
                </select>
                <select id="mcp-sector-filter">
                    <option value="">Filter by Business Sector</option>
                </select>
            </div>

            <!-- Main Content (List + Map) -->
            <div id="mcp-main">
                <!-- Map -->
                <div id="map"></div>

                <!-- Company List -->
                <div id="mcp-company-list">
                    <ul id="mcp-company-items" style="list-style: none; padding: 0; margin: 0;"></ul>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}
