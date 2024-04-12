<?php

include_once( plugin_dir_path(__FILE__) . 'ajax-request/active-customer-ajax.php');

include_once( plugin_dir_path(__FILE__) . 'ajax-request/price-tier-ajax.php');


// Change String to Slug

function woomify_string_to_slug($string) {
    // Remove special characters and spaces
    $slug = preg_replace('/[^a-zA-Z0-9\-]/', '', $string);

    // Convert spaces to hyphens
    $slug = str_replace(' ', '-', $slug);

    // Convert to lowercase
    $slug = strtolower($slug);

    return $slug;
}

include_once( plugin_dir_path(__FILE__) . 'ajax-request/woo-product-ajax.php');

