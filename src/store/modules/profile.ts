import { Module } from 'vuex'
import axios from 'axios'

interface ICoin {
    name: string;
    amount: number;
}

interface IProfileState {
    portfolioCostInUSD: number;
    currencies: ICoin[];
    historicalData: [];
}

export const profile: any = {
    state: {
        portfolioCostInUSD: 900,
        currencies: [
            { name: 'USD', amount: 1000 },
            { name: 'Bitcoin', amount: 900 },
            { name: 'Ether', amount: 800 },
        ],
        historicalData: [],
    },
    getters: {
        portfolioCostInUSD(state: IProfileState): number {
            return state.portfolioCostInUSD;
        },
        coinsData(state: IProfileState): ICoin[] {
            return state.currencies
        },
        historicalData(state: IProfileState) {
            return state.historicalData
        }
    },
    mutations: {
        changeCurrencyAmount(state: IProfileState, payload: any) {
            state.currencies.forEach((coin) => {
                if (payload.coinName === coin.name) {
                    switch (payload.type) {
                        case 'decrease':
                            coin.amount -= payload.number;
                            console.log(payload.coinName, payload.number)
                            console.log(coin.amount);
                            break
                        case 'increase':
                            coin.amount += payload.number;
                            console.log(payload.coinName, payload.number)
                            console.log(coin.amount);
                            break
                        default:
                            break
                    }
                }
            });
        },
        changeHistoricalData(state: any, data: []) {
            state.historicalData = data
        },
    },
    actions: {
        async setHistoricalData(state: any, payload: any) {
            console.log('payload', payload)
            try {
                const historical = await axios.get(`https://api.coingecko.com/api/v3/coins/${payload.coinId1}/market_chart?vs_currency=${payload.coinId2}&days=${payload.days}`)
                console.log("historical", historical.data.market_caps)
                state.commit('changeHistoricalData', historical.data.prices)
                console.log(state.historicalData)

            } catch (err) {
                console.log(err)
            }

        }
    },
    modules: {

    },
};