<?php

/**
 * *******************
 * Load CSS for Frontend
 * *******************
 */
function enqueue_woomify_barcode_generator_frontend_styles()
{
    wp_enqueue_style('woomify-barcode-generator-frontend-styles', plugin_dir_url(__FILE__) . '../style.css', array(), '1.0');
}
add_action('wp_enqueue_scripts', 'enqueue_woomify_barcode_generator_frontend_styles');