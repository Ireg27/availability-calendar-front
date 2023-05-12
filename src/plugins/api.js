import axios from "axios";
import store from "@/store/store";

export default () => {
    const defaultOptions = {
        baseURL: process.env.VUE_APP_API_BASE_URL,
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: ''
        }
    }

    const accessToken = store.state.accessToken

    if (accessToken) defaultOptions.headers.Authorization = 'Bearer ' + accessToken;

    return axios.create(defaultOptions)
}