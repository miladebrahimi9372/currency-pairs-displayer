import { useQuery } from '@tanstack/react-query'

const currencyPairs = async (symbol: string) => {
 const response = await fetch(
  `https://api.kucoin.com/api/v1/market/stats?symbol=${symbol}`
 )
 return response.json()
}

const useGetCurrencyPairsList = (symbols: string[]) => {
 return useQuery({
  queryKey: ['test'],
  queryFn: () => Promise.all(symbols.map(currencyPairs)),
  refetchInterval: 5000
 })
}

export default useGetCurrencyPairsList
