import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);

    // API URL für CoinGecko (kann angepasst werden, um nur bestimmte Coins abzurufen)
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

    useEffect(() => {
        // Funktion zum Abrufen der Krypto-Daten
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setCryptos(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <h1>Krypto Preis Tracker</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Preis (USD)</th>
                    <th>Marktkapitalisierung (USD)</th>
                    <th>24h Veränderung (%)</th>
                </tr>
                </thead>
                <tbody>
                {cryptos.map(crypto => (
                    <tr key={crypto.id}>
                        <td>{crypto.name}</td>
                        <td>{crypto.symbol.toUpperCase()}</td>
                        <td>{crypto.current_price.toFixed(2)}</td>
                        <td>{crypto.market_cap.toLocaleString()}</td>
                        <td
                            className={crypto.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
