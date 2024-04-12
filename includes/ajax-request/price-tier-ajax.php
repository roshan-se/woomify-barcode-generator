<?php

/**
 * 
 * Ajax action to save rules
 */

add_action('wp_ajax_my_save_rules_action', 'woomify_my_save_rules_action_callback');

function woomify_my_save_rules_action_callback()
{
    if (!current_user_can('edit_posts')) {
        wp_send_json_error('Permission denied.');
        exit;
    }
    global $wpdb;

    $data = stripslashes($_POST['data']);

    if (!empty($data)) {
        $decoded_data = json_decode($data, true);
        if ($decoded_data) {
            foreach ($decoded_data as $item) {
                $product_id = $item['productId'];
                $product_name = $item['name'];
                $wholesale_price = isset($item['rules'][0]['regular_price']) ? $item['rules'][0]['regular_price'] : 0;
                $discount_price = isset($item['rules'][1]['regular_price']) ? $item['rules'][1]['regular_price'] : 0;
                $vip_price = isset($item['rules'][2]['regular_price']) ? $item['rules'][2]['regular_price'] : 0;
                $pp_price = isset($item['rules'][3]['regular_price']) ? $item['rules'][3]['regular_price'] : 0;

                // Insert or update data into the custom table
                $table_name = $wpdb->prefix . 'dreamify_price_tier';

                $existing_record = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE product_id = %d", $product_id));

                if ($existing_record) {
                    // If the record exists, update it
                    $wpdb->update(
                        $table_name,
                        array(
                            'wholesale' => $wholesale_price, // Assuming you want to update the 'wholesale' column with the regular price
                            'discount' => $discount_price,
                            'vip' => $vip_price,
                            'pp' => $pp_price,
                        ),
                        array('product_id' => $product_id)
                    );
                } else {
                    // If the record doesn't exist, insert it
                    $wpdb->insert(
                        $table_name,
                        array(
                            'product_id' => $product_id,
                            'name' => $product_name,
                            'wholesale' => $wholesale_price, // Assuming you want to insert the price tier in different roles
                            'discount' => $discount_price,
                            'vip' => $vip_price,
                            'pp' => $pp_price,
                        )
                    );
                }
            }
        }
        // Perform validation and save the data to the database
        update_option('dreamify_rules_options', json_decode($data));
        update_option('dreamify_rules_options_modification_date', current_time('mysql'));

        // Return a response if needed
        wp_send_json_success('Data saved successfully');
    } else {
        wp_send_json_error('Data not received');
    }
}

add_action('wp_ajax_my_save_rules_action_2', 'woomify_my_save_rules_action_callback_2');

function woomify_my_save_rules_action_callback_2()
{
    if (!current_user_can('edit_posts')) {
        wp_send_json_error('Permission denied.');
        exit;
    }

    global $wpdb;

    $data = stripslashes($_POST['data']);

    if (!empty($data)) {
        $decoded_data = json_decode($data, true);
        if ($decoded_data) {
            foreach ($decoded_data as $item) {
                $product_id = $item['productId'];
                $wholesale_price = $item['Wholesale'];
                $discount_price = $item['Discount'];
                $vip_price = $item['VIP'];
                $pp_price = $item['PP'];

                // Insert or update data into the custom table
                $table_name = $wpdb->prefix . 'dreamify_price_tier';

                $existing_record = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE product_id = %d", $product_id));

                if ($existing_record) {
                    // If the record exists, update it
                    $wpdb->update(
                        $table_name,
                        array(
                            'wholesale' => $wholesale_price, // Assuming you want to update the 'wholesale' column with the regular price
                            'discount' => $discount_price,
                            'vip' => $vip_price,
                            'pp' => $pp_price,
                        ),
                        array('product_id' => $product_id)
                    );
                } else {
                    // If the record doesn't exist, insert it
                    $wpdb->insert(
                        $table_name,
                        array(
                            'product_id' => $product_id,
                            'wholesale' => $wholesale_price, // Assuming you want to insert the price tier in different roles
                            'discount' => $discount_price,
                            'vip' => $vip_price,
                            'pp' => $pp_price,
                        )
                    );
                }
            }
        }
        // Perform validation and save the data to the database
        update_option('dreamify_rules_options', json_decode($data));
        update_option('dreamify_rules_options_modification_date', current_time('mysql'));

        // Return a response if needed
        wp_send_json_success('Data saved successfully');
    } else {
        wp_send_json_error('Data not received');
    }
}

/***
 * 
 * Ajax Request to Save the Product
 * 
 */

add_action('wp_ajax_my_save_product_action', 'woomify_my_save_product_action_callback');

function woomify_my_save_product_action_callback()
{
    if (!current_user_can('edit_posts')) {
        wp_send_json_error('Permission denied.');
        exit;
    }

    // Retrieve the post ID sent from the client-side
    $post_id = isset($_POST['postID']) ? intval($_POST['postID']) : 0;

    // Now, you can call your existing save product function with the provided post ID or any other data you need.
    if ($post_id) {
        // Replace 'my_existing_save_product_function' with the actual function that saves your product data.
        my_existing_save_product_function($post_id);

        // Send a success response to the client-side
        wp_send_json_success('Product saved successfully.');
    } else {
        // Send an error response to the client-side if the post ID is missing or invalid
        wp_send_json_error('Invalid post ID.');
    }
}
