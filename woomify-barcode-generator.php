<?php

/*
 * Plugin Name:       Woomify Barcode Generator
 * Plugin URI:        https://example.com/plugins/the-basics/
 * Description:       It creates Woocommerce Products Barcode using ReactJS
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Roshan Adhikari
 * Author URI:        https://roshanadhikari.com.au/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://example.com/my-plugin/
 * Text Domain:       woomify-barcode-generator
 */

 // Register activation hook
register_activation_hook(__FILE__, 'woomify_barcode_generator_activation_callback');

function woomify_barcode_generator_activation_callback()
{
    // Calling function to create custom table in Database
    create_woomify_barcode_generator_table();

    // Calling function to create wp_options
    create_woomify_barcode_generator_options();
}

function create_woomify_barcode_generator_options()
{
    // Check if the option already exists
    if (!get_option('woomify_barcode_generator_options')) {
        // If the option doesn't exist, initialize it as an empty array
        $empty_array = array();
        update_option('woomify_barcode_generator_options', $empty_array);
    }
}

// New Way of storing price tier
function create_woomify_barcode_generator_table()
{
    global $wpdb;

    $table_name = $wpdb->prefix . 'woomify_barcode_generator'; // Prefix the table name with WordPress database prefix
    $charset_collate = $wpdb->get_charset_collate();
    error_log($table_name);

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        wholesale DECIMAL(10, 2) DEFAULT 0.00,
        discount DECIMAL(10, 2) DEFAULT 0.00,
        vip DECIMAL(10, 2) DEFAULT 0.00,
        pp DECIMAL(10, 2) DEFAULT 0.00
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}



/**
 * ------------------------------
 * Deactivation hook
 * ------------------------------
 */

register_deactivation_hook(__FILE__, 'remove_woomify_barcode_generator_table');

function remove_woomify_barcode_generator_table()
{
    global $wpdb;

    $table_name = $wpdb->prefix . 'woomify_barcode_generator';

    $sql = "DROP TABLE IF EXISTS $table_name";

    $wpdb->query($sql);
}


/**
 * ------------------------------
 * 
 * -------------------------------
 */

define('WOOMIFY_BARCODE_GENERATOR_PLUGIN_DIR', plugin_dir_path(__FILE__));

require_once WOOMIFY_BARCODE_GENERATOR_PLUGIN_DIR . 'includes/global-scripts-styles.php';

require_once WOOMIFY_BARCODE_GENERATOR_PLUGIN_DIR . 'includes/admin-menu.php';
require_once WOOMIFY_BARCODE_GENERATOR_PLUGIN_DIR . 'includes/admin-page-callback.php';
require_once WOOMIFY_BARCODE_GENERATOR_PLUGIN_DIR . 'includes/admin-scripts.php';



include_once(WOOMIFY_BARCODE_GENERATOR_PLUGIN_DIR . 'includes/woomify-barcode-generator-section.php');
include_once(WOOMIFY_BARCODE_GENERATOR_PLUGIN_DIR . 'includes/dreamify-custom-ajax.php');


/***
 * Call Modify Product Price based on role
 */


include_once(WOOMIFY_BARCODE_GENERATOR_PLUGIN_DIR . 'includes/plugin-activation.php');


// function enqueue_custom_admin_order_script()
// {
//     $screen = get_current_screen();

//     // Enqueue the script only on the WooCommerce admin order page
//     if ($screen->id === 'shop_order') {
//         wp_enqueue_script('custom-admin-order-script', plugin_dir_url(__FILE__) . 'assets/js/custom-admin-order.js', array('jquery'), '1.0', true);
//         wp_enqueue_script('custom-admin-order-price-script', plugin_dir_url(__FILE__) . 'assets/js/custom-admin-script.js', array('jquery'), '1.0', true);
//     }
// }
// add_action('admin_enqueue_scripts', 'enqueue_custom_admin_order_script');


/**
 * Checking Customer is logged or not
 */

// add_filter('woocommerce_get_price_html', 'dreamify_hide_price_addcart_not_logged_in', 9999, 2);

// function dreamify_hide_price_addcart_not_logged_in($price, $product)
// {
//     $is_price_disabled = get_option( 'dreamify_hide_price_option' );
//     if ( $is_price_disabled && !is_user_logged_in()) {
//         $price = '<div><a href="' . get_permalink(wc_get_page_id('myaccount')) . '">' . __('Login to see prices', 'woomify-barcode-generator') . '</a></div>';
//         remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10);
//         remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30);
//         add_filter('woocommerce_is_purchasable', '__return_false');
//     }
//     return $price;
// }
