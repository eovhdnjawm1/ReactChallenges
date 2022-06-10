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
}
function Chart({ coinId }: Chartprops) {
	const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
	return (
		<>
			{isLoading ? "Loading chart..." : <ApexChart
				type="line"
				series={[
					{
						name: "closePrice",
						data: data?.map(((price) => price.close)) ?? [],
					},
				]}
				options={{
					theme: {
						mode: "dark",
					},
					chart: {
						height: 300,
						width: 500,
						toolbar: {
							show: false
						},
						background: "transparents",
					},
					grid: {
						show: false,
					},
					stroke: {
						curve: "smooth",
						width: 5,
					},
					xaxis: {
						labels: {
							show: false,
						},
						axisTicks: {
							show: false,
						},
						axisBorder: {
							show: false,
						},

					},
					yaxis: {
						show: false,
					},
				}} />}
		</>
	)
}

export default Chart;