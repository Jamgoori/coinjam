// API 주소 관리 및 오타 방지
export const API_ROUTES = {
  COINS:
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=20&page=1&sparkline=true',
  TRENDING: 'https://api.coingecko.com/api/v3/search/trending',
  FIND: (id) => `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=true`,
}
