var ajax_url = dreamify_rbp_data.ajax_url;

jQuery(document).ready(function ($) {
  // Get the customer dropdown element
  var customerDropdown = $("#customer_user");

  // Store the initial selected value
  var initialSelectedValue = customerDropdown.val();

  // Trigger your custom function when a customer is selected
  customerDropdown.on("change", function () {
    // Get the current selected value
    var selectedValue = $(this).val();
    var addressDropdown = $("#custom_shipping_address");
    addressDropdown.empty();

    // Check if the value has changed
    if (selectedValue !== initialSelectedValue) {
      console.log("Customer changed to this id : " + selectedValue);
      console.log("Hey Checking")
      //customParams.changeValue = selectedValue;

      $.ajax({
        url: ajax_url,
        //url: 'http://final-mppc.local/wp-admin/admin-ajax.php',
        method: "POST",
        data: {
          action: "process_ajax_response",
          customerId: selectedValue,
        },
        success: function (response) {
          addressDropdown.append(
            '<option value="">---Select Shipping Address---</option>'
          );
          console.log(response)
          if (response.data) {
            $.each(response.data.shippingAddresses, function (index, option) {
              addressDropdown.append(
                '<option value="' +
                  option.id +
                  '">' +
                  option.shipping_first_name + " ➥ " + option.shipping_last_name +
                  "</option>"
              );
            });
          }
        },
      });

      // Add your custom code here
    }
  });
});

/**
 * Now I will handle the change shipping address select field
 * Handle the change data from jquery and pass as ajax request
 * then I will send back the response and handle those in jquery
 */

jQuery(document).ready(function ($) {
  // Get the customer dropdown element
  var addressDropdown = $("#custom_shipping_address");

  // Store the initial selected value
  var initialSelectedValue = addressDropdown.val();

  // Trigger your custom function when a customer is selected
  addressDropdown.on("change", function () {
    // Get the current selected value
    var selectedValue = $(this).val();

    if (selectedValue === "") {
      return;
    } else {
      // Check if the value has changed
      //if (selectedValue !== initialSelectedValue) {
      console.log("Addresss changed to this id : " + selectedValue);
      //customParams.changeValue = selectedValue;

      $.ajax({
        url: ajax_url,
        method: "POST",
        data: {
          action: "shipping_change_ajax_response",
          addressId: selectedValue,
        },
        success: function (response) {
          console.log(response.data);
          $("#_shipping_first_name").val(
            response.data.shippingAddress.shipping_first_name
          );
          $("#_shipping_last_name").val(
            response.data.shippingAddress.shipping_last_name
          );
          $("#_shipping_shipping_company").val(
            response.data.shippingAddress.shipping_shipping_company
          );
          $("#_shipping_address_1").val(
            response.data.shippingAddress.shipping_address_1
          );
          $("#_shipping_address_2").val(
            response.data.shippingAddress.shipping_address_2
          );
          $("#_shipping_city").val(response.data.shippingAddress.shipping_city);
          $("#_shipping_postcode").val(
            response.data.shippingAddress.shipping_postcode
          );
          $("#_shipping_country").val(
            response.data.shippingAddress.shipping_country
          );
          $("#_shipping_state").val(
            response.data.shippingAddress.shipping_state
          );
          $("#_shipping_phone").val(
            response.data.shippingAddress.shipping_phone
          );
          console.log("Processed AJAX response:", response);
        },
      });

      // Add your custom code here
      //}
    }
  });
});
