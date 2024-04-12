<?php
/**
 * *******************
 * List Woomify Barcode Generator on Admin Menu Bar
 * *******************
 */

 add_action('admin_menu', 'woomify_barcode_generator_options_page');

 function woomify_barcode_generator_options_page()
 {
     add_menu_page(
         'Woomify Barcode Generator',
         'Woomify Barcode',
         'manage_options',
         'woomify-barcode-generator-options',
         'woomify_barcode_generator_admin_page_callback',
         '',
         20
     );
 }