import axios from "axios"
export const getAPI = async (url: string, token?: any) => {
    const res = await axios.get(`/api/${url}`, {
        headers: {
            Authorization: token
        }
    })
    return res;
}

export const postAPI = async (url: string, body: object, token?: any) => {
    const res = await axios.post(`/api/${url}`, body, {
        headers: {
            Authorization: token
        }
    })
    return res;
}