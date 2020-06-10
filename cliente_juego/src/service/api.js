import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://192.168.43.72:3000/api/`
    })
}