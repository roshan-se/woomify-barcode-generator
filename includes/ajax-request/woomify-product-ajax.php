<?php



/**
 * 
 * Ajax call to get Product Name from Prodcut ID
 * 
 */

add_action('wp_ajax_woomify_get_product_details', 'woomify_get_product_details');

function woomify_get_product_details() {
    // Make sure to sanitize the input
    $product_sku = sanitize_text_field($_POST['sku']);
    

    // Check if WooCommerce is active
    if (class_exists('WC_Product')) {

        $product_id = wc_get_product_id_by_sku($product_sku);
        // Get the product object using SKU
        $product = wc_get_product($product_id);

        if (!$product) {
            echo json_encode(['error' => 'No product found for this SKU']);
            wp_die();
        }

        // Gather product details
        $productDetails = [
            'name' => $product->get_name(),
            'price' => $product->get_price(),
            'regular_price' => $product->get_regular_price(),
            'sale_price' => $product->get_sale_price(),
            'description' => $product->get_description(),
            'short_description' => $product->get_short_description(),
            'sku' => $product->get_sku(),
            'stock_status' => $product->get_stock_status(),
            'image_url' => wp_get_attachment_url($product->get_image_id()),
            'stock_quantity' => $product->get_stock_quantity()
        ];

        // Output the product details as JSON
        echo json_encode($productDetails);
        wp_die(); // Always die in functions echoing Ajax content

    } else {
        echo json_encode(['error' => 'WooCommerce is not active']);
        wp_die();
    }
}


/**
 * Update Product Stock Using SKU from Barcode Scanner
 */

add_action('wp_ajax_woomify_update_product_stock', 'woomify_update_product_stock');

function woomify_update_product_stock() {
    if (isset($_POST['sku']) && isset($_POST['quantity'])) {
        $sku = sanitize_text_field($_POST['sku']);
        $quantity = intval($_POST['quantity']);
        $product_id = wc_get_product_id_by_sku($sku);
        $product = wc_get_product($product_id);

        if ($product) {
            $product->set_stock_quantity($quantity);
            $product->save();  // Make sure to save the changes
            wp_send_json_success('Stock updated successfully');
        } else {
            wp_send_json_error('Product not found');
        }
    } else {
        wp_send_json_error('SKU or quantity not provided');
    }
    wp_die();
}


// Register AJAX action for both logged-in and logged-out users
add_action('wp_ajax_woomify_get_products', 'wp_ajax_woomify_get_products');

function wp_ajax_woomify_get_products() {
    // Check for user permissions, if needed
    // if (!current_user_can('manage_options')) {
    //     wp_send_json_error('You do not have sufficient permissions');
    //     wp_die();
    // }

    // Get products from WooCommerce
    $args = array(
        'status' => 'publish',
    );
    $products = wc_get_products($args);
    $product_data = [];

    foreach ($products as $product) {
        $product_data[] = [
            'productId' => $product->get_id(),
            'name' => $product->get_name(),
            'price' => $product->get_price(),  // Returns the current price or sale price if on sale
            'sku' => $product->get_sku(),
        ];
    }

    // Return data as JSON
    wp_send_json_success($product_data);
    wp_die();  // terminate immediately and return a proper response
}



