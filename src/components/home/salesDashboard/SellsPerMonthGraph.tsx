import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
type SellData = {
    month: number;
    value: number;
  };
  

const SellsPerMonthGraph =  ({ data }: { data: SellData[] }) => {
    const [chartOptions, setChartOptions] = useState<any>(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const seriesData = data?.map(item => item.value);
            const options = {
                series: [{
                    name: 'Pedidos por mês',
                    data: seriesData
                }],
                chart: {
                    type: 'bar',
                    toolbar: {
                        show: false 
                    }
                },
                plotOptions: {
                    bar: {
                        enabled: false,
                    }
                },
                colors: ["#393C56"],
                dataLabels: {
                    enabled: false,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },
                xaxis: {
                    categories: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    axisBorder: {
                        show: false
                    },
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
                }
            };

            setChartOptions(options);
        }
    }, [data]);

    return chartOptions && <DynamicApexChart options={chartOptions} series={chartOptions.series} type="bar" height={350}/>;
};

export default SellsPerMonthGraph;