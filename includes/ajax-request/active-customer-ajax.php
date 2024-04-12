<?php

/**
 * 
 * Get Customer ID from ajax request
 * 
 */
add_action('wp_ajax_process_ajax_response', 'woomify_process_ajax_response');
add_action('wp_ajax_nopriv_process_ajax_response', 'woomify_process_ajax_response');

function woomify_process_ajax_response()
{
    $customerID = $_POST['customerId'];

    setcookie("activeCustomer", $customerID, 0, "/");

    update_option('dreamify_order_active_customer', $customerID);
    $shipping_addresses = get_user_meta(intval($customerID), 'shipping_addresses', true);

    $response_data = array(
        'customerID' => $customerID,
        'additionalData' => 'Some additional information',
        'shippingAddresses' => $shipping_addresses
    );

    // Send a response back if necessary
    wp_send_json_success($response_data);
}