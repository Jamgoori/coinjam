import { withAxios } from '../utils/withAxios'
import { API_ROUTES } from '../constants/Routes'

export const getFindCoin = (coinId) => {
  return withAxios({
    url: API_ROUTES.FIND(coinId),
    method: 'GET',
  })
}
