import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ClientTypeGraph = ({ data }: { data: { category: string; value: number }[] }) => {
    const [chartOptions, setChartOptions] = useState<any>(null);
    useEffect(() => {
        if (typeof window !== 'undefined' && data && data.length > 0) {
            const total = data.reduce((acc, curr) => acc + curr.value, 0);
            const options = {
                series: data.map(item => item.value),
                labels: ['Novos Clientes', 'Clientes Recorrentes'],
                chart: {
                    type: 'donut',
                    height: 350,
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '55%',
                        },
                    },
                },
                legend: {
                    show: true,
                    position: 'right',
                },
                colors: ["#9FD8D5", "#7BB686"],
                tooltip: {
                    enabled: true,
                    offsetY: 0,
                    enabledOnSeries: undefined,

                    style: {
                        fontSize: '12px',
                        fontFamily: undefined,
                    },
                },
            };
            setChartOptions(options);
        }
    }, [data]);

    return chartOptions && <DynamicApexChart options={chartOptions} series={chartOptions.series} type="donut" height={350} />;
};

export default ClientTypeGraph;