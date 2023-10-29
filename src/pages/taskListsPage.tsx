import { useCallback, useEffect } from "react";
import { TaskLists } from "../components/TaskLists";
import { useDispatch } from "react-redux";
import Api from "../api";
import { setApiStatusAction } from "../store/apiStatusReducer";
import { setTaskListAction } from "../store/taskListReducer";
import { setTasksAction } from "../store/taskReducer";
import { setUsersAction } from "../store/userReducer";
import { setLabelsAction } from "../store/labelReducer";

export default function TaskListsPage() {

    const dispatch = useDispatch()

    const GetTaskLists = useCallback(async () => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.getTaskLists()
            .then(response => {
                if (response.data.data.length > 0) {
                    dispatch(setTaskListAction(response.data.data))
                }
                dispatch(setApiStatusAction({ loading: false, success: true, message: "" }))
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch])

    const GetTasks = useCallback(async () => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.getTasks()
            .then(response => {
                if (response.data.data.length > 0) {
                    dispatch(setTasksAction(response.data.data))
                }
                dispatch(setApiStatusAction({ loading: false, success: true, message: "" }))
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch])

    const GetUsers = useCallback(async () => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.getUsers()
            .then(response => {
                if (response.data.data.length > 0) {
                    dispatch(setUsersAction(response.data.data))
                }
                dispatch(setApiStatusAction({ loading: false, success: true, message: "" }))
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch])

    const GetLabels = useCallback(async () => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.getLabels()
            .then(response => {
                if (response.data.data.length > 0) {
                    dispatch(setLabelsAction(response.data.data))
                }
                dispatch(setApiStatusAction({ loading: false, success: true, message: "" }))
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch])

    useEffect(() => {
        GetTaskLists();
        GetTasks();
        GetUsers();
        GetLabels();
    }, [])

    return (
        <div className="w-srceen overflow-scroll py-3" style={{height: "100vh"}}>
            <div className="m-auto mt-10 w-fit">
                <TaskLists />
            </div>
        </div>
    )
}