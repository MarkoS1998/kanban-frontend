import { Config } from "../config"
import { taskListRouts } from "../routes"
import axios from 'axios'

export const createTaskList = async (data: any) => {
    try {
        return await axios.post(`${Config.baseURL}${taskListRouts.CREATE}`,
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

export const getTaskLists = async () => {
    try {
        return await axios.get(`${Config.baseURL}${taskListRouts.GET_ALL}`)
    } catch (error) {
        throw error
    }
}

export const completeTaskList = async (data: any) => {
    try {
        return await axios.put(`${Config.baseURL}${taskListRouts.COMPLETE}`,
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

export const deleteTaskList = async (id: number) => {
    try {
        return await axios.delete(`${Config.baseURL}${taskListRouts.DELETE}${id}`)
    } catch (error) {
        throw error
    }
}