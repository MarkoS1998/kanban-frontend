import { getLabels } from "./endpoints/label";
import { createTaskList, getTaskLists, completeTaskList, deleteTaskList } from "./endpoints/taskList";
import { getUsers, login, getUserById } from "./endpoints/user";
import { createTask, getTasks, updateTaskPosition, completeTask, reopenTask, addMember, removeMember, addLabel, removeLabel, editTaskName } from "./endpoints/task";

const Api = {
    getLabels,
    createTaskList,
    getTaskLists,
    completeTaskList,
    deleteTaskList,
    getUsers,
    login,
    getUserById,
    createTask,
    getTasks,
    updateTaskPosition,
    completeTask,
    reopenTask,
    addMember, 
    removeMember, 
    addLabel, 
    removeLabel, 
    editTaskName
}

export default Api;