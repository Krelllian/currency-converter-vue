import { Module } from 'vuex'
import axios from 'axios'

interface ICoin {
    name: string;
    amount: number;
    costInUSD: number;
}

interface IProfileState {
    portfolioCostInUSD: number;
    currencies: ICoin[];
    historicalData: [];
}

export const profile: any = {
    state: {
        portfolioCostInUSD: 0,
        currencies: [
            { name: 'USD', amount: 1000, costInUSD: 1 },
            { name: 'Bitcoin', amount: 900, costInUSD: 29500 },
            { name: 'Ether', amount: 800, costInUSD: 2.175 },
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
                            break
                        case 'increase':
                            coin.amount += payload.number;
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
        changePortfolioCostInUSD(state: any) {
            state.portfolioCostInUSD = state.currencies.reduce(((acc: number, coin: ICoin) => acc + coin.amount * coin.costInUSD), 0)
        }
    },
    actions: {
        async setHistoricalData(state: any, payload: any) {
            try {
                const historical = await axios.get(`https://api.coingecko.com/api/v3/coins/${payload.coinId1}/market_chart?vs_currency=${payload.coinId2}&days=${payload.days}`)
                state.commit('changeHistoricalData', historical.data.prices)
            } catch (err) {
                console.log(err)
            }
        },
        async setAccountBalance(state: any,) {
            state.commit('changePortfolioCostInUSD')
        }
    },
    modules: {

    },
};