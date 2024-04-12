<?php

// Create a function to add a custom section after General Pricing
function woomify_add_custom_section_after_pricing()
{
    global $post;
    // Check if the post type is 'product'
    if ($post->post_type === 'product') {
        $product = wc_get_product($post->ID); // Get the product object
        $product_type = $product->get_type(); // Get the product type
        if ($product_type === 'simple') {
            ob_start(); // Start output buffering
            // Begin capturing the HTML output
?>
        <div id="woomify-barcode-section"></div>
<?php
            $html = ob_get_clean(); // Get the captured HTML and clear the output buffer
            echo $html; // Output the HTML
        }
    }
}

// Hook the function into the 'woocommerce_product_options_pricing' action
add_action('woocommerce_product_options_pricing', 'woomify_add_custom_section_after_pricing');
