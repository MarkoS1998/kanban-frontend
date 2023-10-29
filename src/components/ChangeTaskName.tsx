import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { getLabelsArray, getUsersArray } from "../store/selectors";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setTaskLabelsAction, setTaskNameAction } from "../store/taskReducer";
import { SingleLabel } from "../types";
import { setApiStatusAction } from "../store/apiStatusReducer";
import Api from "../api";

interface Props {
    name: string;
    id: number
}

export default function ChangeTaskName({ name, id }: Props) {

    const [newName, setNewName] = useState(name);

    const dispatch = useDispatch()

    const editTaskName = useCallback(async () => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.editTaskName({ id: id, name: newName })
            .then(response => {
                dispatch(setApiStatusAction({ loading: false, success: true, message: "" }))
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch])

    const handleSetName = async () => {
        if (newName !== name) {
            dispatch(
                setTaskNameAction({
                    id: id,
                    name: newName,
                })
            )
            await editTaskName();
        }
    }
    return (
        <div className="border-t-2 mt-2">
            <b className="text-violet-700" >Edit Name</b>
            <br /><br />
            <b className="text-violet-700" >Name</b>
            <div className="">
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="p-1 w-full"
                    autoFocus
                    required
                />
                <button onClick={handleSetName} className="block mt-3 text-white bg-violet-700 px-3 py-1 rounded-md shadow-md">
                    Submit
                </button>
            </div>
        </div>
    )
}