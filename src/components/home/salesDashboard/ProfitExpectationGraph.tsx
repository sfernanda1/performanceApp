import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { formatCurrency } from '@/services/base';


const DynamicApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Data = {
    month: number;
    value: number;
};

const TooltipProfit = ({ currentValue, currentMonth, previousValue }: { currentValue: number, currentMonth: number, previousValue: number }) => {
    return (
        `<div class="bg-white border rounded p-2 ">
            <div class="flex justify-between ">
                <p class="mr-2">Mês atual</p>
                <p class="font-bold">${currentMonth}</p>
            </div>
            <p>R$ <b>${formatCurrency(currentValue)}</b></p>
            <div class=" border-t-2 mt-2 pt-2">
                <p class="mr-2">Mês do ano anterior:</p>
                <p>R$ <b>${formatCurrency(currentValue)}</b></p>
            </div>
        </div>`

    );
}

const ProfitExpectationGraph = ({ realData, expectationData }: { realData: Data[], expectationData: Data[] }) => {

    const [chartOptions, setChartOptions] = useState<any>(null);

    useEffect(() => {
        const seriesExpectationData = expectationData?.map(item => item.value);
        const seriesRealData = realData?.map(item => item.value);
        const options = {

            series: [
                {
                    name: 'Lucro real',
                    type: 'column',
                    data: seriesRealData,
                    
                },
                {
                    name: 'Expectativa ',
                    type: 'column',
                    data: seriesExpectationData,

                },
                {
                    name: 'Lucro real do ano anterior',
                    type: 'line',
                    data: [440, 480, 505, 520, 535, 550, 540, 530, 510, 495, 475, 460]
                },
                {
                    name: 'Expectativa do ano anterior',
                    type: 'line',
                    data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200]
                },

            ],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: [0, 0]
            },
            colors: ["#9FD8D5", "#F78899", "#393C56", "#E0347D"],
            dataLabels: {
                enabled: false,
            },
            labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            xaxis: {
                type: 'category'
            },
            yaxis: {
                axisBorder: {
                    show: true
                },
                labels: {
                    show: false,
                }
            },
            legend: {
                position: 'top',
            },
            grid: {
                show: false,
            },
            tooltip: {
                enabled: true,
                custom: ({ series, seriesIndex, dataPointIndex, w }: { series: any[], seriesIndex: number, dataPointIndex: number, w: any }) => {
                    const currentMonth = w.globals.labels[dataPointIndex];
                    const currentValue = series[seriesIndex][dataPointIndex];
                    const previousValue = series[seriesIndex + 2][dataPointIndex];

                    return TooltipProfit({ currentMonth, currentValue, previousValue });
                }
            },
        }
        setChartOptions(options);
    }, [realData, expectationData]);

    return chartOptions && <DynamicApexChart options={chartOptions} series={chartOptions.series} type="bar" height={350} />;

};

export default ProfitExpectationGraph;