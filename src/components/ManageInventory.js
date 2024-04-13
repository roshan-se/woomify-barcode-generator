import axios from "axios";
import { useState } from "react";
import Barcode from "react-barcode";
import { NotificationManager } from "react-notifications";
import useScanDetection from "use-scan-detection-react18";

const { ajax_url, dreamify_hide_price_option } = woomify_barcode_generator_data;

export default function ManageInventory() {
  const [barcode, setBarcode] = useState({
    productName: "Terminator Case - iPhone 15",
    productNumber: "",
  });

  const [barcodeScan, setBarcodeScan] = useState("No Barcode Scanned");

  const [productDetails, setProductDetails] = useState({});

  const [newQuantity, setNewQuantity] = useState(null);

  useScanDetection({
    onComplete: (code) => {
      setBarcodeScan(code);
      setBarcode((prevBarcode) => ({
        ...prevBarcode,
        productNumber: code,
      }));
      console.log("Now I will fetch data");
      fetchProductDetails(code);
    },
    minLength: 3,
  });

  const fetchProductDetails = async (sku) => {
    const data = {
      action: "woomify_get_product_details",
      sku: sku,
    };

    await axios
      .post(ajax_url, new URLSearchParams(data))
      .then((response) => {
        console.log("Checking Product Details: ", response);
        setProductDetails(response.data);
        setNewQuantity(response.data.stock_quantity);
      })
      .catch((error) => {
        // Handle errors if any
        console.error(
          "There was an error fetching the product details: ",
          error
        );
      });
  };

  const updateStockQuantity = async (sku, newQuantity) => {
    await axios
      .post(
        ajax_url,
        new URLSearchParams({
          action: "woomify_update_product_stock",
          sku: sku,
          quantity: newQuantity,
        })
      )
      .then((response) => {
        if (response.data.success) {
          console.log("Stock updated:", response.data);
          NotificationManager.success(
            "Product Stock Updated Successfully",
            "Update Stock"
          );
          // Optionally refresh the product details or alert the user
        } else {
          console.error("Error updating stock:", response.data.data);
        }
      })
      .catch((error) => {
        console.error("AJAX Error:", error);
      });
  };

  return (
    <div className='relative'>
      <div className='max-w-2xl pb-10 divide-y divide-slate-100'>
        <div className='flex flex-col items-center'>
          <h2 className='text-2xl font-semibold'>Product Details</h2>
          <h4 className='text-sm text-gray-500 italic mb-4'>
            *** Scan to Update Stock ***
          </h4>
          {productDetails.name ? (
            <>
              <div className='border rounded-md shadow-md p-4 my-4 flex flex-col items-center'>
                <h3 className='text-base font-semibold'>
                  {productDetails.name}
                </h3>
                <Barcode
                  value={productDetails.sku}
                  width={2}
                />
              </div>
              <div className='border rounded-md shadow-md p-4 my-4'>
                <h3 className='text-base font-semibold'>Stock Quantity</h3>
                <div className="flex mt-2">
                  <input
                    type='number'
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className='stock-checker-input w-3/4'
                  />
                  <button
                    className='w-1/4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-50 hover:text-gray-50 px-4 py-2 rounded-r-md'
                    onClick={() =>
                      updateStockQuantity(productDetails.sku, newQuantity)
                    }>
                    Update
                  </button>
                </div>
              </div>
              <hr />
              Just Barcode: {barcode.productNumber}
            </>
          ) : (
            <div className='border rounded-md shadow-md p-10 my-4 '>
              <h4 className='text-base'>No Barcode Scanned Yet</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
