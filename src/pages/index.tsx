import { getCancelledOrders, getDoneOrders, getOrdersPerCategory, getProfitExpectation, getRealProfit, getSellsPerMonth, getAvgTicketDay, getAvgTicketMonth, getOrdersMonth, getProductsAlerts, getSellsMonth, getFunnelData, getUserProfileData } from "@/services/home";
import InitialMetrics from "@/components/home/InitialMetrics";
import ProductsTable from "@/components/products/ProductsList";
import SalesDashboardGraphs from "@/components/home/salesDashboard/SalesDashboardGraphs";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoadingContext } from "@/context/LoadingContext";
import { LoadingAnimation } from "@/components/base/LoadingAnimation";
import { useStatusAlertContext } from "@/context/StatusAlertContext";
import UserProfileGraphs from "@/components/home/userProfile/UserProfileGraphs";
export default function Home() {
  const [metricsData, setMetricsData] = useState<any>(null);
  const { isLoading, setLoading } = useLoadingContext();
  const { setStatus, setMessage } = useStatusAlertContext()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const [
  //         avgTicketDay,
  //         avgTicketMonth,
  //         productsAlerts,
  //         ordersMonth,
  //         sellsMonth,
  //         sellsPerMonth,
  //         profitExpectation,
  //         realProfit,
  //         doneOrders,
  //         cancelledOrders,
  //         ordersPerCategory,
  //         funnelData,
  //         userProfileData
  //       ] = await Promise.all([
  //         getAvgTicketDay(),
  //         getAvgTicketMonth(),
  //         getProductsAlerts(),
  //         getOrdersMonth(),
  //         getSellsMonth(),
  //         getSellsPerMonth(),
  //         getProfitExpectation(),
  //         getRealProfit(),
  //         getDoneOrders(),
  //         getCancelledOrders(),
  //         getOrdersPerCategory(),
  //         getFunnelData(),
  //         getUserProfileData()
  //       ]);
  //       const data = {
  //         avgTicketDay,
  //         avgTicketMonth,
  //         productsAlerts,
  //         ordersMonth,
  //         sellsMonth,
  //         sellsPerMonth,
  //         profitExpectation,
  //         realProfit,
  //         doneOrders,
  //         cancelledOrders,
  //         ordersPerCategory,
  //         funnelData,
  //         userProfileData
  //       };
  //       setMetricsData(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setStatus("error");
  //       setMessage("Ocorreu um erro, atualize a página!");
  //     }
  //   };
  //   if(!metricsData){
  //     fetchData();
  //   }

  // }, []); 

  return (
    isLoading ?
      <div className="mr-2">
        <LoadingAnimation />
      </div>
      :
      <div className="w-full ">
        <InitialMetrics metricsData={metricsData} />
        <Typography variant="h6" className="ml-5 mt-5 font-bold mb-5 text-green-800">Vendas</Typography>
        <SalesDashboardGraphs metricsData={metricsData} />
        <Typography variant="h6" className="ml-5 mt-5 font-bold mb-5 text-green-800">Perfil do consumidor</Typography>
        <UserProfileGraphs metricsData={metricsData} />
      </div>

  );
}
