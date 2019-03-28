import axios  from "axios"

const ajax = axios.create({
    baseURL: 'http://192.168.43.240:5000'
})

export const getImgsList = (page) => {
    return ajax.get(`/api/imgs&page=${page}`)
}