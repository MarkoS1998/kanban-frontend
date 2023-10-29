import { Config } from "../config"
import { taskRouts } from "../routes"
import axios from 'axios'

export const createTask = async (data: any) => {
    try {
        return await axios.post(`${Config.baseURL}${taskRouts.CREATE}`,
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

export const getTasks = async () => {
    try {
        return await axios.get(`${Config.baseURL}${taskRouts.GET_ALL}`)
    } catch (error) {
        throw error
    }
}

export const updateTaskPosition = async (data: any) => {
    try {
        return await axios.put(`${Config.baseURL}${taskRouts.UPDATE_POSITION}`,
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

export const completeTask = async (data: any) => {
    try {
        return await axios.put(`${Config.baseURL}${taskRouts.COMPLETE}`,
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

export const reopenTask = async (data: any) => {
    try {
        return await axios.put(`${Config.baseURL}${taskRouts.REOPEN}`,
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

export const addMember = async (data: {id: number, user_id: number}) => {
    try {
        return await axios.put(`${Config.baseURL}${taskRouts.ADD_MEMBER}`,
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

export const removeMember = async (data: {id: number, user_id: number}) => {
    try {
        return await axios.put(`${Config.baseURL}${taskRouts.REMOVE_MEMER}`,
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

export const addLabel = async (data: {id: number, label_id: number}) => {
    try {
        return await axios.put(`${Config.baseURL}${taskRouts.ADD_LABEL}`,
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

export const removeLabel = async (data: {id: number, label_id: number}) => {
    try {
        return await axios.put(`${Config.baseURL}${taskRouts.REMOVE_LABEL}`,
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

export const editTaskName = async (data: {id: number, name: string}) => {
    try {
        return await axios.put(`${Config.baseURL}${taskRouts.EDIT_NAME}`,
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