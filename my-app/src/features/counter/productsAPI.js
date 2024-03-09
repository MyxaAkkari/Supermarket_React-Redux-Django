import axios from "axios";

const MY_SERVER = 'http://127.0.0.1:8000/store/products/'
export const getProducts = () => {
    return axios.get(MY_SERVER)

}

export const addProduct = (pName, desc, price) => {
    return axios.post(MY_SERVER, {pName, desc, price})
}

export const delProduct = (id) => {
    return axios.delete(`${MY_SERVER}${id}`)
}

export const updProduct = (id, pName, desc, price) => {
    return axios.put(`${MY_SERVER}${id}`, {pName, desc, price})
}