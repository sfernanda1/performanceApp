import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type TransactionData = {
    category: string;
    value: number;
};

const TransactionsByAgeGraph = ({ data }: { data: TransactionData[] }) => {
    const [chartOptions, setChartOptions] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' ) {
            const categories = data.map(item => item.category);
            const seriesData = data?.map(item => item.value);
            const options = {
                series: [{
                    name: 'Transações por idade',
                    data: seriesData
                }],
                chart: {
                    height: 350,
                    type: 'bar',
                    toolbar: {
                        show: false 
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: categories,
                  
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                },
                fill: {
                    colors: ["#393C56"]
                },
                tooltip: {
                    enabled: true,
                   
                }
            };
            setChartOptions(options);
        }
    }, [data]);

    return chartOptions && <DynamicApexChart options={chartOptions} series={chartOptions.series} type="bar" height={350} />;
};

export default TransactionsByAgeGraph;