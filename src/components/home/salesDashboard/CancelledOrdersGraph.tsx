import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';


const DynamicApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Data = {
    month: number;
    value: number;
};

const CancelledOrdersGraph = ({ doneOrders, cancelledOrders }: { doneOrders: Data[], cancelledOrders: Data[] }) => {
   
    const [chartOptions, setChartOptions] = useState<any>(null);

    useEffect(() => {
        const seriesExpectationData = cancelledOrders?.map(item => item.value);
        const seriesDonesOrders = doneOrders?.map(item => item.value);
        const options = {

            series: [
                {
                    name: 'Realizados',
                    type: 'column',
                    data: seriesDonesOrders
                },
                {
                    name: 'Cancelados',
                    type: 'column',
                    data: seriesExpectationData,

                },
            ],
            chart: {
                height: 350,
                type: 'line',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '80%', 
                }
            },
            colors: ["#109E8E", "#F18F7F"],
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
            grid: {
                show: false,
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
            }, tooltip: {
                enabled: true, 
                
            }
        }
        setChartOptions(options);
    }, [doneOrders, cancelledOrders]);

    return chartOptions && <DynamicApexChart options={chartOptions} series={chartOptions.series} type="bar" height={350} />;

};

export default CancelledOrdersGraph;