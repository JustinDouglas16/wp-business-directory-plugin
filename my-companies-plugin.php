<?php
/**
 * Plugin Name: My Companies Plugin
 * Description: A plugin to display companies CPT data with maps using Leaflet.
 * Version: 1.0
 * Author: Your Name
 */

// Prevent direct access.
if (! defined('ABSPATH')) {
    exit;
}

/**
 * Main plugin class for My Companies Plugin
 */
class My_Companies_Plugin {
    /**
     * Plugin instance
     *
     * @var My_Companies_Plugin
     */
    private static $instance = null;

    /**
     * Get plugin instance
     *
     * @return My_Companies_Plugin
     */
    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->define_constants();
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Define plugin constants
     */
    private function define_constants() {
        define('MCP_PLUGIN_DIR', plugin_dir_path(__FILE__));
        define('MCP_PLUGIN_URL', plugin_dir_url(__FILE__));
        define('MCP_VERSION', '1.0.0');
    }

    /**
     * Include required files
     */
    private function includes() {
        require_once MCP_PLUGIN_DIR . 'includes/class-mcp-companies-cpt.php';
        require_once MCP_PLUGIN_DIR . 'includes/class-mcp-assets.php';
        require_once MCP_PLUGIN_DIR . 'includes/class-mcp-shortcode.php';
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Initialize classes
        new MCP_Companies_CPT();
        new MCP_Assets();
        new MCP_Shortcode();
    }
}

// Initialize the plugin
function mcp_init() {
    My_Companies_Plugin::get_instance();
}
add_action('plugins_loaded', 'mcp_init');
