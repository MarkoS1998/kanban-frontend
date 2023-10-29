import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { getUsersArray } from "../store/selectors";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setTaskAssigneeAction } from "../store/taskReducer";
import { SingleUser } from "../types";
import { setApiStatusAction } from "../store/apiStatusReducer";
import Api from "../api";

interface Props {
    assignee: number[];
    id: number
}

export default function ChangeTaskMembers({ assignee, id }: Props) {

    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => getUsersArray(state))

    const [otherMembers, setOtherMembers] = useState<SingleUser[]>(
        users.filter(x => assignee.indexOf(x.id) < 0)
    )

    const addMember = useCallback(async (user_id: number) => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.addMember({ id: id, user_id: user_id })
            .then(response => {
                dispatch(setApiStatusAction({ loading: false, success: true, message: "" }))
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch])

    const handleAddMember = async (userId: number) => {
        setOtherMembers(otherMembers.filter(x => x.id !== userId))
        dispatch(
            setTaskAssigneeAction({
                id: id,
                assignee: [...assignee, userId],
            }),
        );
        await addMember(userId)
    }

    const removeMember = useCallback(async (user_id: number) => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.removeMember({ id: id, user_id: user_id })
            .then(response => {
                dispatch(setApiStatusAction({ loading: false, success: true, message: "" }))
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch])

    const handleRemoveMember = async (userId: number) => {
        setOtherMembers([...otherMembers, users.filter(x => x.id === userId)[0]])
        dispatch(
            setTaskAssigneeAction({
                id: id,
                assignee: assignee.filter(x => x !== userId),
            }),
        );
        await removeMember(userId)
    }

    return (
        <div className="border-t-2 mt-2">
            <b className="text-violet-700" >Edit members</b>
            <br /><br />
            <b className="text-violet-700" >Assignee</b>
            <div className="flex flex-wrap">
                {
                    assignee.length > 0 ?
                        users.length > 0 &&
                        assignee.map((id, index) => {
                            const { avatar_url, name } = users.filter(x => x.id === id)[0]
                            return (
                                <div key={index} onClick={() => { handleRemoveMember(id) }} className="flex items-center p-1 bg-white m-1.5 cursor-pointer" >
                                    <img
                                        src={avatar_url}
                                        alt={name}
                                        className="w-7 h-7 rounded-full"
                                    />
                                    <p className="m-1.5">
                                        {name}
                                    </p>
                                </div>
                            );
                        })
                        :
                        <b>No members.</b>
                }
            </div>
            <b className="text-violet-700" >Add member</b>
            <div className="flex overflow-y-scroll flex-wrap max-h-64">
                {
                    otherMembers.length > 0 ?
                        otherMembers.map((otherMember, index) => {
                            const { avatar_url, name, id } = otherMember
                            return (
                                <div key={index} onClick={() => { handleAddMember(id) }} className="flex items-center p-1 bg-white m-1.5 cursor-pointer" >
                                    <img
                                        src={avatar_url}
                                        alt={name}
                                        className="w-7 h-7 rounded-full"
                                    />
                                    <p className="m-1.5">
                                        {name}
                                    </p>
                                </div>
                            );
                        })
                        :
                        <b>All members are included.</b>
                }
            </div>
        </div>
    )
}