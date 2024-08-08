import HorizontalScroll from "@/components/base/HorizontalScroll";
import ClientTypeGraph from "./ClientTypeGraph";
import SessionsByGenderGraph from "./SessionsByGenreGraph";
import TransactionsByAgeGraph from "./TransactionsByAgeGraph";
import GraphContainer from "@/components/base/GraphContainer";

export default function UserProfileGraphs({ metricsData }: any) {

    return (
        // metricsData &&
        <HorizontalScroll>
            <div className="flex gap-6 p-2">
                <GraphContainer title="Transações por idade">
                    <TransactionsByAgeGraph data={metricsData?.userProfileData?.['transactions-per-age'] ||  [{category:12, value:12, }, { category: 13, value:12}, { category: 14, value:12}, { category: 15, value:15}, { category: 16, value:52}, { category: 17, value:1}]} />
                </GraphContainer>
                <GraphContainer title="Sessões por gênero">
                    <SessionsByGenderGraph data={metricsData?.userProfileData?.['sessions-per-sex'] || {male: 10, female: 15}} />
                </GraphContainer>
                <GraphContainer title="Transações por tipo de cliente">
                    <ClientTypeGraph data={metricsData?.userProfileData?.['transactions-per-client-type'] ||  [{value:15}, { value: 12}]} />
                </GraphContainer>
            </div>
        </HorizontalScroll>

    );
}
