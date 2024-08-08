import HorizontalScroll from "@/components/base/HorizontalScroll";
import CancelledOrdersGraph from "./CancelledOrdersGraph";
import ProfitExpectationGraph from "./ProfitExpectationGraph";
import SellsPerMonthGraph from "./SellsPerMonthGraph";
import GraphContainer from "@/components/base/GraphContainer";
export default function SalesDashboardGraphs({ metricsData }: any) {
    console.log(metricsData);
    return (
        <HorizontalScroll>
            <div className="flex gap-6 p-2">
                <GraphContainer title="Pedidos por mês">
                    <SellsPerMonthGraph data={metricsData?.sellsPerMonth || [{value:15}, { value: 12}]} />
                </GraphContainer>
                <GraphContainer title="Expectativa de lucro x lucro real">
                    <ProfitExpectationGraph expectationData={metricsData?.profitExpectation ||[{value:15}, { value: 12}]} realData={metricsData?.realProfit ||  [{value:15}, { value: 12}]} />
                </GraphContainer>
                <GraphContainer title="Pedidos realizados x pedidos cancelados">
                    <CancelledOrdersGraph doneOrders={metricsData?.doneOrders ||  [{value:15}, { value: 12}]} cancelledOrders={metricsData?.cancelledOrders ||  [{value:15}, { value: 12}]} />
                </GraphContainer>
            </div>

        </HorizontalScroll>
    );
}
