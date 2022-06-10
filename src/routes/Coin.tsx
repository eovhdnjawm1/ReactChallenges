import { useParams } from 'react-router-dom'

interface RouteParms {
	coinId: string
}

function Coin() {
	const { coinId } = useParams<RouteParms>();

	return <h1> Coin : {coinId} </h1>
}

export default Coin