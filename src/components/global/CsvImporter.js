import { useState } from "react";
import axios from "axios";
import CSVReader from "react-csv-reader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const { ajax_url, dreamify_rules_options_modification_date } = woomify_barcode_generator_data;

export default function DreamifyCsvImporter() {
  const [rules, setRules] = useState([]);

  const handleCSVFile = (data, fileInfo) => {
    console.log("CSV Data:", data);
    const newData = data.map((item) => {
      const { ID, Name, Regular, Wholesale, VIP, Discount, PP } = item;
      return {
        productId: ID,
        name: Name,
        regular_price: Regular,
        rules: [
          {
            id: 1,
            role: "Wholesale",
            regular_price: Wholesale || "",
          },
          {
            id: 2,
            role: "Discount",
            regular_price: Discount || "",
          },
          {
            id: 3,
            role: "VIP",
            regular_price: VIP || "",
          },
          {
            id: 4,
            role: "PP",
            regular_price: PP || "",
          },
        ],
      };
    });
    console.log(newData);
    setRules(newData);
  };

  const saveRules = (e) => {
    e.preventDefault();
    console.log("Now saving rules");
    const data = {
      action: "my_save_rules_action",
      data: JSON.stringify(rules),
    };

    axios
      .post(ajax_url, new URLSearchParams(data))
      .then((response) => {
        console.log("Checking Response after saving: ", response);
        const inputField = document.getElementById("react-csv-reader-input");
        inputField.value = "";
        NotificationManager.success(
          "File Imported Successfully",
          "Price Rule CSV"
        );
      })
      .catch((error) => {
        // Handle errors if any
        console.error(error);
      });
  };

  const handleCSVError = (err, file, inputElem, reason) => {
    console.error(err);
  };
  return (
    <div className='py-4'>
      <div className="mb-2">
        <h3 className='text-base font-medium'>
          Import Pricing Rules - CSV Import
        </h3>
        <p className="text-gray-500">You can import your price rules through csv file format.</p>
      </div>

      <div className='flex p-2 items-center justify-between border border-emerald-50 rounded-md shadow-md'>
        <CSVReader
          onFileLoaded={handleCSVFile}
          onError={handleCSVError}
          parserOptions={{
            header: true,
            skipEmptyLines: true,
          }}
        />
        <button
          onClick={saveRules}
          className='bg-emerald-400 hover:bg-emerald-500 text-gray-50 px-4 py-2 rounded-tr-md rounded-bl-md'>
          Import
        </button>
      </div>
      { dreamify_rules_options_modification_date && (
        <p className="text-gray-500 mt-4"><span className="font-semibold">Last modified date:</span> <span className="italic underline text-emerald-500">{dreamify_rules_options_modification_date}</span></p>
      )}
      <NotificationContainer />
    </div>
  );
}
