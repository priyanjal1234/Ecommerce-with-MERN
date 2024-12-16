import { IndianRupee } from "lucide-react";
import React from "react";

const AnalyticsCard = ({ title, value, icon }) => {
  return (
    <div className="ml-[22%] w-[250px] shrink-0 h-[100px] p-3 flex items-center justify-between mb-5 gap-4 bg-[#1F2937] rounded-lg">
      <div>
        <h2 className="text-gray-500">{title}</h2>
        <div className="flex items-center">
          {title === "Total Revenue" && <IndianRupee />}
          <h1 className="text-3xl font-bold">{value}</h1>
        </div>
      </div>
      <div className="w-[52px] h-[52px] text-purple-600 flex items-center justify-center bg-[#374151] rounded-lg">
        {icon}
      </div>
    </div>
  );
};

export default AnalyticsCard;
