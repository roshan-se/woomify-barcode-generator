import React, { useState } from "react";
import GlobalSettings from "../components/GlobalSettings";
import { NotificationContainer } from "react-notifications";
import PriceChecker from "../components/PriceChecker";

const tabs = [
  {
    id: 1,
    name: "Global Settings",
    value: "tab1",
    icon: "dashicons-admin-settings",
  },
  {
    id: 2,
    name: "Price Checker",
    value: "tab3",
    icon: "dashicons-filter",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className='my-4 mr-4 bg-white p-8 shadow-md rounded-md'>
      <h1 className='text-xl font-medium mb-6'>
        Woomify Barcode Generator Dashboard
      </h1>

      {/* Tab Component for Dashboard */}
      <div className='mt-4'>
        <ul className='flex border-b'>
          {tabs.map((tab) => (
            <li
              key={tab.value}
              className={`mb-0 px-4 py-2 cursor-pointer rounded-t-md transition-colors duration-100 ${
                activeTab === tab.value ? "bg-emerald-400 text-gray-50" : ""
              }`}
              onClick={() => setActiveTab(tab.value)}>
              <a>
                <span className={`dashicons ${tab.icon}`}></span>
                <span className='ml-1'>{tab.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Component Render as per tab condition */}
      <div className='p-4'>
        {activeTab === "tab2" ? <PriceChecker /> : <GlobalSettings />}
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Dashboard;
