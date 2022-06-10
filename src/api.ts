const url = "https://api.coinpaprika.com/v1/coins";

export function fetchCoins() {
	return fetch(url).then(response => response.json());
}