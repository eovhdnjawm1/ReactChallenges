import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from "react-apexcharts"

interface IHistorical {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface Chartprops {
	coinId: string;
	isTheme: boolean;
}

function Chart({ coinId, isTheme }: Chartprops) {
	const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
		{
			refetchInterval: 10000,
		});
	return (
		<>
			{isLoading ? "Loading chart..." : (
				<ApexChart
					type="candlestick"
					series={[
						{
							data: data?.map((price) => {
								return {
									x: price.time_open,
									y: [price.open.toFixed(2),
									price.high.toFixed(2),
									price.low.toFixed(2),
									price.close.toFixed(2)]
								};
							}),
						},
					] as any}
					options={{
						colors: [
							'#546E7A', '#E91E63',
						],
						theme: {
							mode: isTheme ? "light" : "dark",
						},
						chart: {
							height: 500,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: {
							show: true,
						},
						stroke: {
							curve: "smooth",
							width: 3,
						},
						xaxis: {
							type: "datetime",
							labels: {
								show: true,
								format: "M/dd",
							},
							axisTicks: {
								show: false,
							},
							axisBorder: {
								show: false,
							},
							tooltip: {
								enabled: false,
							},
						},
						yaxis: {
							labels: {
								show: true,
							},
						},
						plotOptions: {
							candlestick: {
								colors: {
									upward: "#FF6363",
									downward: "#219F94",
								},
							},
						},

					}}
				/>
			)
			}
		</>
	)
}

export default Chart;