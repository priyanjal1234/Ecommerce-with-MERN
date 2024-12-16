import axios from "axios";
import { useEffect, useState } from "react";

function useSalesData() {
  const [salesData, setsalesData] = useState([]);
  useEffect(() => {
    async function fetchSales() {
      try {
        let salesRes = await axios.get("http://localhost:3000/api/admin/sales",{withCredentials: true});
        let formatedData = salesRes.data?.map(item => ({
            month: new Date(2024,item._id - 1).toLocaleString("default",{month: "short"}),
            totalSales: item.totalSales
        }))
        setsalesData(formatedData);
      } catch (error) {
        console.log(
          error?.response?.data?.message || error?.response?.data?.errorMessage
        );
      }
    }
    fetchSales()
  }, []);

  return salesData
}

export default useSalesData;
