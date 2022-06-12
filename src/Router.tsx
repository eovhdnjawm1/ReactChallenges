import { BrowserRouter, Switch, Route } from "react-router-dom"
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouterProps {
	toggleDark: () => void;
	isTheme: boolean;
}

function Router({ toggleDark, isTheme }: IRouterProps) {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/:coinId">
					<Coin isTheme={isTheme} />
				</Route>
				<Route path="/">
					<Coins toggleDark={toggleDark} />
				</Route>
			</Switch>
		</BrowserRouter>
	)

}


export default Router;