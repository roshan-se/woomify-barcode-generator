<?php

add_action('admin_enqueue_scripts', 'woomify_barcode_generator_admin_enqueue_scripts');

function woomify_barcode_generator_admin_enqueue_scripts()
{
    wp_enqueue_style(
        'woomify-barcode-generator-admin',
        plugin_dir_url(__FILE__) . '../build/dashboard-app.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'woomify-barcode-generator-admin',
        plugin_dir_url(__FILE__) . '../build/dashboard-app.js',
        array('wp-components', 'wp-element'),
        '1.0.0',
        true
    );

    $coming_soon = plugins_url('../public/images/dreamify-coming-soon.jpg', __FILE__);

    wp_localize_script(
        'woomify-barcode-generator-admin',
        'woomify_barcode_generator_data',
        array(
            'is_admin' => function_exists('is_admin') ? is_admin() : true,
            'ajax_url' => admin_url('admin-ajax.php'),
            'roles'    => wp_roles()->roles,
            'woomify_barcode_generator_options' => get_option('woomify_barcode_generator_options'),
            'woomify_barcode_generator_options_modification_date' => get_option('woomify_barcode_generator_options_modification_date'),
            'comingSoonImageURL' => $coming_soon
        )
    );

    wp_enqueue_script('woomify-barcode-generator-admin');
}
