import { withAxios } from '../utils/withAxios'
import { API_ROUTES } from '../constants/Routes'

export const getTrending = async () => {
  return await withAxios({
    url: API_ROUTES.TRENDING,
    method: 'GET',
  })
}
