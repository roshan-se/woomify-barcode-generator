import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";
import Dashboard from "./pages/Dashboard";
import SingleProductBarcodeGenerator from "./components/products/SingleProductBarcodeGenerator";

const { is_admin } = woomify_barcode_generator_data;

if (typeof is_admin !== "undefined" && is_admin === "1" && window.location.href.includes("page=woomify-barcode-generator-options")) {
  ReactDOM.render(
    <Dashboard />,
    document.getElementById("woomify-barcode-generator-dashboard")
  );
} else {
  console.log("No I not in admin reached here");
}

if (
  typeof is_admin !== "undefined" &&
  is_admin === "1" &&
  window.location.href.includes("post.php") &&
  window.location.href.includes("action=edit")
) {
  const appBarcodeGeneratorSection = document.getElementById("woomify-barcode-section");
  if (appBarcodeGeneratorSection) {
    console.log("Now editing product");
    ReactDOM.render(
      <SingleProductBarcodeGenerator />,
      appBarcodeGeneratorSection
    );
  } else {
    console.log("Element appBarcodeGeneratorSection not found in DOM");
  }
} else {
  console.log("Not reached edit product")
}
