var admin_ajax_url = dreamify_rbp_data.ajax_url;

jQuery(document).ready(function($) {
    console.log("I am called to check customer id change")
    // Get the customer dropdown element
    var customerDropdown = $('#customer_user');

    // Store the initial selected value
    var initialSelectedValue = customerDropdown.val();
    
    $('#customer_user').on('change', function() {
        var order_id = $(this).data('order-id');
        var selectedValue = $(this).val();
        if (order_id) {
            $.ajax({
                url: admin_ajax_url,
                type: 'POST',
                data: {
                    action: 'get_updated_customer_id',
                    order_id: order_id
                },
                success: function(response) {
                    if (response.success) {
                        if (selectedValue !== initialSelectedValue) {
                            console.log('Customer changing to this id : ' + selectedValue);
                            // Add your custom code here
                        
                            //var customer_id = response.data;
                            var customer_id = selectedValue;
                            // Handle the updated customer ID as needed
                            $('.order_data_column .woocommerce_order_items_wrapper').trigger('update_order_items', order_id, customer_id);
                        }
                    } else {
                        console.error(response.data);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error(textStatus + ': ' + errorThrown);
                }
            });
        }
    });
});

jQuery(document).ready(function($) {
    // Check if the #customer_user element exists
    var customerDropdown = $('#customer_user');
    if (customerDropdown.length) {
        // Get the initial selected value
        var initialSelectedValue = customerDropdown.val();

        // Set a cookie with the value
        document.cookie = "activeCustomer=" + initialSelectedValue + ";path=/";
        console.log('Cookie set with value:', initialSelectedValue);
    } else {
        console.log("#customer_user element not found in the DOM.");
    }
});

