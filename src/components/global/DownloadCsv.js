import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const { dreamify_rules_options } = woomify_barcode_generator_data;

export default function DownloadCsv() {
  const [users, setUsers] = useState(dreamify_rules_options);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    if (users) {
      const newData = users.map((item) => {
        const newItem = { productId: item.productId, name: item.name, Regular: item.regular_price };

        item.rules.forEach((rule) => {
          newItem[rule.role] = rule.sale_price;
        });

        return newItem;
      });

      setTransformedData(newData);
    }
  }, []);

  return (
    <div className='py-4'>
      <div className='mb-2'>
        <h3 className='text-base font-medium'>Download Latest CSV</h3>
        <p className='text-gray-500'>
          You can download csv to keep track of the product and latest price
          variation.
        </p>
      </div>
      <CSVLink
        data={transformedData}
        className='bg-sky-400 hover:bg-sky-500 text-gray-50 hover:text-gray-50 px-4 py-2 rounded-tr-md rounded-bl-md'>
        Download Me
      </CSVLink>
    </div>
  );
}
