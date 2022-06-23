import { useQuery } from "react-query";
import { fetchCoinPrice } from "../api";
import ApexChart from "react-apexcharts"
interface ITodayPrice {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

interface Priceprops {
	coinId: string;
}

function Price({ coinId }: Priceprops) {
	const { isLoading, data } = useQuery<ITodayPrice[]>(["today", coinId], () =>
		fetchCoinPrice(coinId)
	);

	return (
		<>
			{isLoading ? "Loading chart..." : <ApexChart
				type="line"
				series={[
					{
						name: "TodayPrice",
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
							datetimeFormatter: { month: "mmm 'yy" }
						},
						axisTicks: {
							show: false,
						},
						axisBorder: {
							show: false,
						},
						type: "datetime",
						categories: data?.map((date) => date.time_close),

					},
					yaxis: {
						show: false,
					},
					fill: {
						type: "gradient",
						gradient: { gradientToColors: ["blue"], stops: [0, 100] },

					},
					colors: ["red"],
					tooltip: {
						y: {
							formatter: (value) => `$ ${value.toFixed(2)}`
						},
					}
				}} />}
		</>
	)
}

export default Price;