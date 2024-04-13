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


