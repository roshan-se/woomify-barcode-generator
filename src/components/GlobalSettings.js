import { useState } from "react";
import DreamifyCsvImporter from "./global/CsvImporter";
import DownloadCsv from "./global/DownloadCsv";
import HidePriceOption from "./global/HidePriceOption";
import Barcode from "react-barcode";
import useScanDetection from "use-scan-detection-react18";

export default function GlobalSettings() {
  const generateUniqueBarcodeNumber = () => {
    let uniqueId = Date.now().toString().slice(-10);

    // Optionally, you can add a random number to ensure uniqueness in high-frequency scenarios
    let randomPart = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");

    // Concatenate the time-based ID with the random part
    return uniqueId + randomPart;
  };

  const [barcode, setBarcode] = useState({
    productName: "Terminator Case - iPhone 15",
    productNumber: "",
  });

  const [barcodeScan, setBarcodeScan] = useState("No Barcode Scanned");

  useScanDetection({
    onComplete: (code) => {
      setBarcodeScan(code);
      setBarcode((prevBarcode) => ({
        ...prevBarcode,
        productNumber: code,
      }));
    },
    minLength: 3,
  });

  const generateBarcode = () => {
    setBarcode((prevBarcode) => ({
      ...prevBarcode,
      productNumber: generateUniqueBarcodeNumber(),
    }));
  };

  return (
    <div className='relative'>
      <div className='max-w-sm pb-10 divide-y divide-slate-100'>
        <div>
          <button
            onClick={generateBarcode}
            className='bg-violet-400 hover:bg-violet-500 text-gray-50 hover:text-gray-50 px-4 py-2 rounded-tr-md rounded-bl-md'>
            Generate Barcode
          </button>
          <hr />
          {barcode.productNumber && (
            <div className='border rounded-md shadow-md p-4 my-4 flex flex-col items-center'>
              <h3 className='text-base font-semibold'>{barcode.productName}</h3>
              <Barcode
                value={barcode.productNumber}
                width={2}
              />
            </div>
          )}
        </div>
        <div>
          <h2 className='my-4 text-3xl font-semibold'>Scan Barcode</h2>
          <hr />
          Barcode: {barcodeScan}
        </div>
      </div>
    </div>
  );
}
