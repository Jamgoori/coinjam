import { withAxios } from '../utils/withAxios'
import { API_ROUTES } from '../constants/Routes'

export const getCoins = async () => {
  return await withAxios({
    url: API_ROUTES.COINS,
    method: 'GET',
  })
}
