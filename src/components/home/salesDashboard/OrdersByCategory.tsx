import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const OrdersPerCategory = ({ data }: { data: any[] }) => {
    const [chartOptions, setChartOptions] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && data) {
            const categories = data.map(item => item.category);
            const values = data.map(item => item.value);

            const options = {
                series: values,
                labels: categories,
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
                            formatter: function (val: any, opts: any) {
                                return '';
                            }
                        }
                    }
                },
                legend: {
                    show: true,
                    position: 'right',
                },
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

export default OrdersPerCategory;