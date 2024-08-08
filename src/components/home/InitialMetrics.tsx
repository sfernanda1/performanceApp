
import { formatCurrency, getPreviousDays, getPreviousMonth } from "@/services/base";
import MetricCard from "../base/MetricCard";
import HorizontalScroll from "../base/HorizontalScroll";

export default function InitialMetrics({ metricsData }: any) {
    return (
        metricsData &&
        <HorizontalScroll>
            <MetricCard
                positiveStatus={metricsData?.avgTicketDay?.growth > 0}
                title="Ticket médio últimas 24h"
                value={`${metricsData?.avgTicketDay?.growth} %`}
                description="em relação a ontem"
                totalValue={<div>R$ <b>{formatCurrency(metricsData?.avgTicketDay?.value)}</b></div>}
            />
            <MetricCard
                positiveStatus={metricsData?.avgTicketMonth?.growth > 0}
                title="Ticket médio mensal"
                value={`${metricsData?.avgTicketMonth?.growth} %`}
                description={getPreviousMonth()}
                totalValue={<div>R$ <b>{formatCurrency(metricsData?.avgTicketMonth?.value || 0)}</b></div>}
            />
            <MetricCard
                positiveStatus={getPreviousDays(metricsData?.productsAlerts[0]?.since) < 1}
                title="Produtos em manutenção"
                value={`há ${getPreviousDays(metricsData?.productsAlerts[0]?.since).toString()} dias`}
                totalValue={<div><b>{metricsData?.productsAlerts[0]?.value}</b> produtos</div>} />
            <MetricCard
                positiveStatus={getPreviousDays(metricsData?.productsAlerts[1]?.since) < 1}
                title="Acabando o estoque"
                value={`há ${getPreviousDays(metricsData?.productsAlerts[1]?.since).toString()} dias`}
                description="repor o quanto antes"
                totalValue={<div><b>{metricsData?.productsAlerts[1]?.value}</b> produtos</div>} />
            <MetricCard
                positiveStatus={metricsData?.ordersMonth?.growth > 0}
                title="Pedidos realizados no mês"
                value={`${metricsData?.ordersMonth?.growth} %`}
                description={getPreviousMonth()}
                totalValue={<div><b>{metricsData?.ordersMonth?.value}</b> pedidos</div>} />
            <MetricCard
                positiveStatus={metricsData?.sellsMonth?.growth > 0}
                title="Produtos vendidos no mês"
                value={`${metricsData?.sellsMonth?.growth} %`}
                description={getPreviousMonth()}
                totalValue={<div><b>{metricsData?.sellsMonth?.value}</b> produtos</div>} />
        </HorizontalScroll>

    );
}


