import axios from 'axios'
const createAxiosInstance = () => {
  return axios.create()
}
export const withAxios = async (request) => {
  return await createAxiosInstance().request({
    ...request,
  })
}
