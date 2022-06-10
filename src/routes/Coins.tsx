import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';


const Title = styled.h1`
	color: ${props => props.theme.accentColor};
	font-size: 48px;
`

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
	width: 100vw;
	height: 100vh;

`

const Header = styled.header`
	height: 10vh;
	display:flex;
	justify-content: center;
	align-items: center;
`

const CoinsList = styled.ul`

`

const Coin = styled.li`
	background-color: white;
	color: ${props => props.theme.bgColor};
	margin-bottom: 10px;
	border-radius: 15px;
	
	a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`


interface CoinInterface {
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

const Bounce = keyframes`
	from {
		transform: scaleX(1.25);
	}

	to {
		transform: translateY(-50px) scaleX(1);
	}
`

const BounceLoading = styled.div`
	width: 120px;
	height: 75px;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
	justify-content: space-between;
`

const Ball = styled.div`
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background-color: #fff;
	animation: ${Bounce} .2s alternate infinite;

&:nth-child(2) {
	animation-delay: .2s;
}

&:nth-child(3) {
	animation-delay: .4s;
}
`

const BallText = styled.span`
	font-size: 22px;
	text-transform: uppercase;
	color: #fff;
	margin-top: 25px;
`

function Coins() {

	const [coins, setCoins] = useState<CoinInterface[]>([])
	const url = "https://api.coinpaprika.com/v1/coins";
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		(async () => {
			const response = await fetch(url)
			const json = await response.json();
			console.log(json);
			setCoins(json.slice(0, 100));
			setLoading(false);
		})();
	}, []);
	console.log(coins);
	return (

		<Container>
			<Header>
				<Title> 코인</Title>
			</Header>
			{loading ?
				<Loader>
					<BounceLoading>
						<Ball></Ball>
						<Ball></Ball>
						<Ball></Ball>
						<BallText>Loading...</BallText>
					</BounceLoading>
				</Loader>
				: (<CoinsList>
					{coins.map((coin) => (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`}>
								<img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
								{coin.name} &rarr;</Link>
						</Coin>
					))}
				</CoinsList>)}
		</Container>
	)
}

export default Coins