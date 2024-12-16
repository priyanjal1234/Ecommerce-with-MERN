import React from "react";
import useSalesData from "../../hooks/useSalesData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const LineChartCompo = () => {
  let salesData = useSalesData();
  return (
    <div className="mt-4">
      {salesData?.length !== 0 && (
        <>
          <h1 className="text-2xl font-semibold">Charts For KPIs</h1>
          <h2 className="text-xl font-semibold mb-3">Total Sales Over Time</h2>

          <LineChart width={600} height={300} data={salesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            {/* <CartesianGrid stroke='#ccc' />  */}
            <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
          </LineChart>
        </>
      )}
    </div>
  );
};

export default LineChartCompo;
