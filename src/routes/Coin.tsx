import { Link, Switch, Route, useLocation, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import Chart from "./Chart"
import Price from "./Price"
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from './../api';
import BounceBall from '../BounceBall'
import { Helmet } from 'react-helmet-async';

interface RouteParms {
	coinId: string
}

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
	width: 100vw;
	height: 100vh;
	
	`

const Title = styled.h1`
		color: ${props => props.theme.accentColor};
		font-size: 48px;
	`

const Button = styled.div`
	font-size: 1.5em;
  border: none;
  border-radius: 1em;
  background-color: ${(props) => props.theme.cardColor};
  cursor: pointer;
  padding: 5px 10px;
  `

const Header = styled.header`
	height: 10vh;
	display:flex;
	justify-content: center;
	align-items: center;
`

const Loader = styled.div`
	display:flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  line-height: 25px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span <  { isActive: boolean }> `
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const BackButton = styled.button`
  border: none;
  border-radius: 5px;
  cursor:pointer;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
`;


interface RouteState {
	name: string;
}

interface ITag {
	coin_counter: number;
	ico_counter: number;
	id: string;
	name: string;
}
interface IInfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	tags: ITag[];
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}
interface ITickersData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		}
	};
}


interface ICoinProps {
	isTheme: boolean;
}


function Coin({ isTheme }: ICoinProps) {
	const { coinId } = useParams<RouteParms>();
	const { state } = useLocation<RouteState>();
	const priceMatch = useRouteMatch("/:coinId/price")
	const chartMatch = useRouteMatch("/:coinId/chart")
	const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
	const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickersData>(["tickers", coinId], () => fetchCoinTickers(coinId), {
		refetchInterval: 5000,
	});

	const history = useHistory();

	const loading = infoLoading || tickersLoading;
	return <Container>
		<BackButton onClick={() => history.push("/")}>🏠</BackButton>
		<Helmet>
			<title>{state?.name ? state.name : loading ? "Loading.." : infoData?.name}</title>
		</Helmet>
		<Header>
			<Title> {state?.name ? state.name : loading ? "Loading.." : infoData?.name} </Title>
		</Header>
		{loading ?
			<Loader>
				<BounceBall />
			</Loader>
			: (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>
								Chart
							</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>
								Price
							</Link>
						</Tab>
					</Tabs>



					<Switch>
						<Route path={`/:coinId/price`}>
							<Price coinId={coinId} />
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart isTheme={isTheme} coinId={coinId} />
						</Route>
					</Switch>
				</>

			)}
	</Container>
}

export default Coin