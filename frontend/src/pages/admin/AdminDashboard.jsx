import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import dashboardService from "../../services/Dashboard";
import AnalyticsCard from "../../components/admin/AnalyticsCard";

import { IndianRupee, ShoppingBag, Users } from "lucide-react";
import LineChartCompo from "../../components/admin/LineChartCompo.jsx";

const AdminDashboard = () => {
  const [totalRevenue, settotalRevenue] = useState(0);
  const [totalOrders, settotalOrders] = useState([]);
  const [customers, setcustomers] = useState([]);

  async function fetchAnalytics() {
    try {
      let fetchAnalyticsRes = await dashboardService.getAnalytics();
      settotalRevenue(fetchAnalyticsRes.data.total);
      settotalOrders(fetchAnalyticsRes.data.allOrders);
      setcustomers(fetchAnalyticsRes.data.allCustomers);
    } catch (error) {
      console.log(
        error?.response?.data?.message || error?.response?.data?.errorMessage
      );
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#111827] text-white">
      <AdminSidebar />
      <div className="flex ml-[20%]">
        <div className="pt-5">
          <AnalyticsCard
            title="Total Revenue"
            value={totalRevenue}
            icon={<IndianRupee />}
          />
          <AnalyticsCard
            title="Total Orders"
            value={totalOrders.length}
            icon={<ShoppingBag />}
          />
          <AnalyticsCard
            title="Total Customers"
            value={customers.length}
            icon={<Users />}
          />
        </div>

        <div className="ml-[20%] pl-8 mt-3">
          
          <LineChartCompo />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
