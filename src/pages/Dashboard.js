import React, { useState } from "react";
import { NotificationContainer } from "react-notifications";
import ManageInventory from "../components/ManageInventory";
import GenerateBarcode from "../components/GenerateBarcode";

const tabs = [
  {
    id: 1,
    name: "Manage Inventory",
    value: "tab1",
    icon: "dashicons-admin-settings",
  },
  {
    id: 2,
    name: "Generate Barcode",
    value: "tab2",
    icon: "dashicons-editor-justify",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className='my-4 mr-4 bg-white shadow-md rounded-md'>
      <div className='bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-t-md p-8 text-white'>
        <h1 className='text-4xl font-semibold text-center text-white mb-6'>
          Woomify Barcode Generator
        </h1>
      </div>

      {/* Tab Component for Dashboard */}
      <div className='mt-4 p-8'>
        <ul className='flex border-b gap-x-2'>
          {tabs.map((tab) => (
            <li
              key={tab.value}
              className={`mb-0 px-4 py-2 cursor-pointer rounded-t-md transition-colors hover:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:text-white ${
                activeTab === tab.value
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                  : ""
              }`}
              onClick={() => setActiveTab(tab.value)}>
              <a className='hover:text-white'>
                <span
                  className={`dashicons ${tab.icon} ${
                    tab.icon === "dashicons-editor-justify" ? "rotate-90" : ""
                  }`}></span>
                <span className='ml-1'>{tab.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Component Render as per tab condition */}
      <div className='p-4'>
        {activeTab === "tab2" ? (
          <GenerateBarcode />
        ) : (
          <>
            {/* <GlobalSettings /> */}
            <ManageInventory />
          </>
        )}
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Dashboard;
