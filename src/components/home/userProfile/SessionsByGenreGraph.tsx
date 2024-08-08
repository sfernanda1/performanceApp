import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SessionsByGenderGraph = ({ data }: { data: { male: number, female: number } }) => {
    const [chartOptions, setChartOptions] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && data) {
            const options = {
                series: [data.male, data.female],
                labels: ['Masculino', 'Feminino'],
                chart: {
                    type: 'donut',
                    height: 350,
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '55%',
                            labels: {
                                show: false,
                                name: {
                                    show: false,

                                },
                                value: {
                                    show: false,
                                },
                                total: {
                                    show: false,

                                }
                            },
                         
                        }
                    }
                },
                legend: {
                    show: true,
                    position: 'right',
                },
                colors: ["#F7C982", "#393C56"],
                tooltip: {
                    enabled: true,
                    enabledOnSeries: undefined,
                    formatter: undefined,
                    offsetY: 0,
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

export default SessionsByGenderGraph;