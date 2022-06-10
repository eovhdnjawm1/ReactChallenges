import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from './../api';
import BounceBall from '../BounceBall'
import { Helmet } from 'react-helmet';



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

const Header = styled.header`
	height: 10vh;
	display:flex;
	justify-content: center;
	align-items: center;
`
const CoinsList = styled.ul`
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 1.4em;
  border: none;
  border-radius: 1em;
  background-color: ${(props) => props.theme.cardColor};
`;
const Button = styled.div`
  position: absolute;
  border: none;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  background-color: ${(props) => props.theme.accentColor};
  margin: 0;
  z-index: 1;
  transition: transform 200ms linear;
  left: 0em;
`;
const Coin = styled.li`
	background-color: ${(props) => props.theme.cardColor};
	color: ${props => props.theme.bgColor};
	margin-bottom: 10px;
	border-radius: 15px;
	
	a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
	align-items: center;

  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`

interface ICoin {
	id: string,
	name: string,
	symbol: string,
	rank: number,
	is_new: boolean,
	is_active: boolean,
	type: string,
}

const Loader = styled.div`
	display:flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 15px;
`

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)

	return (

		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>

				<Title> 코인</Title>
			</Header>
			{isLoading ?
				<Loader>
					<BounceBall />
				</Loader>
				: (<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link to={{
								pathname: `/${coin.id}`,
								state: { name: coin.name },

							}}>
								<Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
								{coin.name} &rarr;</Link>

						</Coin>
					))}
				</CoinsList>)}
		</Container>
	)
}

export default Coins