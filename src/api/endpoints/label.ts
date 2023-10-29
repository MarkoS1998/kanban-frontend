import { Config } from "../config"
import { labelRouts } from "../routes"
import axios from 'axios'

export const getLabels = async () => {
    try {
        return await axios.get(`${Config.baseURL}${labelRouts.GET_ALL}`)
    } catch (error) {
        throw error
    }
}