# My Companies Plugin

## Overview
My Companies Plugin is a WordPress plugin designed to display company information on an interactive map using Leaflet. The plugin creates a custom post type for companies and provides a shortcode to embed an interactive map with filtering capabilities.

## Features
- Custom post type for company entries
- Interactive map display using Leaflet
- Marker clustering for better visualization
- Search functionality
- Filtering by district and business sector
- Responsive design for both desktop and mobile
- Clean OOP architecture

## Recent Improvements
The plugin has undergone significant refactoring to improve code quality, maintainability, and organization:

### PHP Code Improvements
1. **Object-Oriented Architecture**
   - Implemented proper OOP design pattern with class separation
   - Created a main plugin class using the singleton pattern
   - Separated functionality into dedicated classes

2. **Directory Structure Reorganization**
   - Organized files into logical directories:
     - `includes/` for PHP classes
     - `assets/css/` for stylesheets
     - `assets/js/` for JavaScript files

3. **CSS Externalization**
   - Moved inline CSS to an external stylesheet
   - Improved separation of concerns

### JavaScript Modernization
The frontend JavaScript was refactored using modern ES6+ practices:

1. **Class-Based Architecture**
   - Encapsulated map functionality in a `CompaniesMap` class
   - Improved code organization and maintainability

2. **Modular Design**
   - Split functionality into focused methods
   - Improved error handling and data validation

3. **Modern JavaScript Features**
   - Arrow functions for cleaner syntax
   - Template literals for more readable HTML construction
   - ES6 array methods for more declarative programming
   - Proper DOM manipulation techniques

## Installation
1. Upload the plugin files to `/wp-content/plugins/my-companies-plugin/` directory
2. Activate the plugin through the WordPress admin interface
3. Create company entries with location information
4. Use the `[companies_map]` shortcode to display the map on any page or post

## Requirements
- WordPress 5.0 or higher
- PHP 7.4 or higher
- ACF (Advanced Custom Fields) plugin for company meta fields

## Usage

### Adding Company Entries
1. Navigate to "Companies" in the WordPress admin menu
2. Click "Add New Company"
3. Fill in the company information:
   - Title
   - Address
   - Latitude and Longitude (required for map placement)
   - Contact information (phone, email, website)
   - Social media links
   - District and Business Sector for filtering
   - Featured image (displayed in map popup)

### Displaying the Map
Insert the shortcode `[companies_map]` on any page or post where you want the map to appear.

### Custom Field Requirements
The plugin expects the following ACF fields to be defined for the Companies custom post type:
- `latitude` (text/number)
- `longitude` (text/number)
- `phonenumber` (text)
- `address` (text/textarea)
- `email` (email)
- `website` (url)
- `facebook` (url)
- `instagram` (url)
- `linkedin` (url)
- `district` (text/select)
- `business_sector` (text/select)

## Customization

### Styling
To customize the appearance of the map and company listings:
1. Modify the `mcp-styles.css` file in the `assets/css/` directory

### Map Configuration
To change the default map view or settings:
1. Edit the initialization parameters in the `CompaniesMap` constructor in `assets/js/mcp-map.js`

## Developer Information

### Plugin Structure
```
my-companies-plugin/
├── my-companies-plugin.php          # Main plugin file
├── includes/
│   ├── class-mcp-companies-cpt.php  # Companies CPT class
│   ├── class-mcp-assets.php         # Assets management class
│   └── class-mcp-shortcode.php      # Shortcode class
├── assets/
│   ├── css/
│   │   └── mcp-styles.css           # Plugin CSS
│   └── js/
│       └── mcp-map.js               # Map JavaScript
└── readme.txt                       # Plugin documentation
```

### Hooks
The plugin provides the following action hooks for further customization:
- `mcp_before_map_render` - Fires before the map shortcode is rendered
- `mcp_after_map_render` - Fires after the map shortcode is rendered
- `mcp_company_data_filter` - Filter hook to modify company data before it's sent to JavaScript

## Future Enhancements
Planned improvements for future versions:
- Company import/export functionality
- Additional map layers and providers
- Enhanced geocoding integration
- Custom markers based on business sector
- User-submitted company suggestions

## Troubleshooting
If the map doesn't display properly:
1. Check browser console for JavaScript errors
2. Verify that all required files are being loaded
3. Ensure company entries have valid latitude/longitude values
4. Check for conflicts with other plugins using Leaflet

## Credits
- Built with [Leaflet](https://leafletjs.com/) mapping library
- Uses [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) for clustering
- Icons provided by [Font Awesome](https://fontawesome.com/)
