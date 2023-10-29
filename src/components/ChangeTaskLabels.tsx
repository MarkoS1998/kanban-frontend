import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { getLabelsArray, getUsersArray } from "../store/selectors";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setTaskLabelsAction } from "../store/taskReducer";
import { SingleLabel } from "../types";
import Api from "../api";
import { setApiStatusAction } from "../store/apiStatusReducer";

interface Props {
    labels: number[];
    id: number
}

export default function ChangeTaskLabels({ labels, id }: Props) {

    const dispatch = useDispatch()
    const allLabels = useSelector((state: RootState) => getLabelsArray(state))

    const [otherLabels, setOtherLabels] = useState<SingleLabel[]>(
        allLabels.filter(x => labels.indexOf(x.id) < 0)
    )

    const addLabel = useCallback(async (label_id: number) => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.addLabel({ id: id, label_id: label_id })
            .then(response => {
                dispatch(setApiStatusAction({ loading: false, success: true, message: "" }))
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch])

    const handleAddLabel = async (labelId: number) => {
        setOtherLabels(otherLabels.filter(x => x.id !== labelId))
        dispatch(
            setTaskLabelsAction({
                id: id,
                labels: [...labels, labelId],
            }),
        );
        await addLabel(labelId)
    }

    const removeLabel = useCallback(async (label_id: number) => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.removeLabel({ id: id, label_id: label_id })
            .then(response => {
                dispatch(setApiStatusAction({ loading: false, success: true, message: "" }))
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch])

    const handleRemoveLabel = async (labelId: number) => {
        setOtherLabels([...otherLabels, allLabels.filter(x => x.id === labelId)[0]])
        dispatch(
            setTaskLabelsAction({
                id: id,
                labels: labels.filter(x => x !== labelId),
            }),
        );
        await removeLabel(labelId)
    }
    return (
        <div className="border-t-2 mt-2">
            <b className="text-violet-700" >Edit Labels</b>
            <br /><br />
            <b className="text-violet-700" >Labels</b>
            <div className="flex flex-wrap">
                {
                    
                    labels.length > 0 ?
                    allLabels.length > 0 &&
                    labels.map((id, index) => {
                        const { color } = allLabels.filter(x => x.id === id)[0]
                        return (
                            <div key={index} onClick={() => { handleRemoveLabel(id) }} className="flex items-center p-1 bg-white m-1.5 cursor-pointer" >
                                <div
                                    key={id}
                                    className="w-7 h-7 rounded-full"
                                    style={{
                                        backgroundColor: color,
                                    }}
                                ></div>
                            </div>
                        );
                    })
                    :
                    <b>No labels.</b>
                }
            </div>
            <b className="text-violet-700" >Add label</b>
            <div className="flex flex-wrap">
                {
                    otherLabels.length > 0 ?
                    otherLabels.map((otherLabel, index) => {
                        const { color, id } = otherLabel
                        return (
                            <div key={index} onClick={() => { handleAddLabel(id) }} className="flex items-center p-1 bg-white m-1.5 cursor-pointer" >
                                <div
                                    key={id}
                                    className="w-7 h-7 rounded-full"
                                    style={{
                                        backgroundColor: color,
                                    }}
                                ></div>
                            </div>
                        );
                    })
                    :
                    <b>All labels are included.</b>
                }
            </div>
        </div>
    )
}