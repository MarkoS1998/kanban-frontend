import { Config } from "../config"
import { userRouts } from "../routes"
import axios from 'axios'

export const getUsers = async () => {
    try {
        return await axios.get(`${Config.baseURL}${userRouts.GET_ALL}`)
    } catch (error) {
        throw error
    }
}

export const login = async (data: any) => {
    try {
        return await axios.post(`${Config.baseURL}${userRouts.LOGIN}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (error) {
        throw error
    }
}

export const getUserById = async (id: number) => {
    try {
        return await axios.get(`${Config.baseURL}${userRouts.GET_BY_ID}${id}`)
    } catch (error) {
        throw error
    }
}