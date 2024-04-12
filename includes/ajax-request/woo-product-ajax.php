<?php 



/**
 * 
 * Ajax call to get Product Name from Prodcut ID
 * 
 */
add_action('wp_ajax_dreamify_get_product_name', 'woomify_get_product_name');

function woomify_get_product_name()
{
    $productId = intval($_POST['product_id']);

    // Check if WooCommerce is active
    if (class_exists('WC_Product')) {
        // Get the product object
        $product = wc_get_product($productId);

        $productName = $product->get_name();
        echo $productName;
        wp_die(); // Always die in functions echoing Ajax content
        
    } else {
        // Return error or null if WooCommerce is not active
        return 'WooCommerce is not active';
    }
}