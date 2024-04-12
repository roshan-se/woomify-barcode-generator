import axios from "axios";
import { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";

const { ajax_url, dreamify_hide_price_option } = woomify_barcode_generator_data;

export default function HidePriceOption() {
  const [isHidePriceChecked, setIsHidePirceChecked] = useState(false);

  useEffect(() => {
    setIsHidePirceChecked(dreamify_hide_price_option);
  }, []);

  //dreamify_hide_price_action

  const handleHidePriceChange = async (event) => {
    setIsHidePirceChecked(event.target.checked);
    const data = {
      action: "dreamify_hide_price_action",
      data: JSON.stringify(event.target.checked),
    };

    await axios
      .post(ajax_url, new URLSearchParams(data))
      .then((response) => {
        const message = event.target.checked ? "Price is hidden to Guest" : "Price is visible to everyone";
        const title = event.target.checked ? "Hidden" : "Visible";
        NotificationManager.success(
          message,
          title
        );
      })
      .catch((error) => {
        // Handle errors if any
        console.error(error);
      });
  };
  return (
    <div className='flex justify-between items-center mb-2 py-4'>
      <div>
        <h3 className='text-base font-medium mr-2'>Hide Price Guest User</h3>
        <p className='text-gray-500'>
          This will disable price view for customer not logged in.
        </p>
      </div>

      <div className='-mb-0.5'>
        <input
          type='checkbox'
          name=''
          id=''
          checked={isHidePriceChecked}
          onChange={handleHidePriceChange}
        />
      </div>
    </div>
  );
}
