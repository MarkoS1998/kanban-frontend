import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { SingleTask } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import comments from "../assets/comments.svg";
import subtasks from "../assets/subtasks.svg";
import dayjs from "dayjs";
import { getLabelsArray, getUsersArray } from "../store/selectors";
import ChangeTaskMembers from "./ChangeTaskMembers";
import ChangeTaskLabels from "./ChangeTaskLabels";
import ChangeTaskName from "./ChangeTaskName";

interface Props {
    data: SingleTask;
    isOpen: boolean;
    closeFn: () => void;
    submitFn?: (text: string) => void;
}

const editMenu = [
    "Edit name","Members", "Labels"
]

export default function EditTaskModal({ data, closeFn, submitFn, isOpen }: Props) {

    const allLabels = useSelector((state: RootState) => getLabelsArray(state))
    const users = useSelector((state: RootState) => getUsersArray(state))
    const [selectedMenu, setSelectedMenu] = useState(editMenu[0])

    const {
        id,
        is_important,
        name,
        labels,
        comments_count,
        open_subtasks,
        start_on,
        due_on,
        assignee,
        is_completed,
    } = data;

    const displayDueOnDate = (date: string | null) => {
        if (!date) return "";
        if (dayjs().year() !== Number(dayjs(date).format("YYYY"))) {
            return dayjs(date).format("MMM D. YYYY");
        } else {
            return dayjs(date).format("MMM D.");
        }
    };
    return (
        <Modal open={isOpen} onClose={closeFn} className="flex items-center justify-center">
            <div className={`m-auto outline-none w-screen max-w-screen-md flex bg-slate-100 shadow-lg rounded-md border-[1px] overflow-hidden ${is_important
                ? "before:bg-pink-600 before:w-1 before:block"
                : "before:bg-slate-100 before:w-1 before:block"
                } ${is_completed && "before:bg-green-50 bg-green-50"}`}
            >
                <div className="flex-1 p-2">
                    <b className={`${is_completed && "line-through"}`}>
                        #{id} {name}
                    </b>
                    <div className="flex gap-2 items-center mt-2">
                        {allLabels !== undefined && allLabels.length > 0 && labels.length > 5 ? (
                            <div className="flex gap-1 items-center">
                                {[...labels].slice(0, 5).map((id, index) => {
                                    const { color } = allLabels.filter(x => x.id === id)[0]
                                    return (
                                        <div
                                            key={index}
                                            className="w-2 h-2 rounded-full"
                                            style={{
                                                backgroundColor: color,
                                            }}
                                        />
                                    );
                                })}
                                <span className="text-gray-400 text-sm">
                                    +{labels.length - 5}
                                </span>
                            </div>
                        ) : allLabels !== undefined && allLabels.length > 0 && labels.length > 0 ? (
                            <div className="flex gap-1">
                                {
                                    labels.map((id) => {
                                        const { color } = allLabels.filter(x => x.id === id)[0]
                                        return (
                                            <div
                                                key={id}
                                                className="w-2 h-2 rounded-full"
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            ></div>
                                        );
                                    })
                                }
                            </div>
                        ) : (
                            <></>
                        )}
                        {comments_count > 0 && (
                            <div className="flex gap-1 items-center">
                                <img src={subtasks} alt="comment_icon" className="w-4" />
                                <span className="text-gray-400 text-sm">
                                    {comments_count}
                                </span>
                            </div>
                        )}
                        {open_subtasks > 0 && (
                            <div className="flex gap-1 items-center">
                                <img src={comments} alt="subtasks_icon" className="w-4" />
                                <span className="text-gray-400 text-sm">{open_subtasks}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-bold text-gray-700">
                            <span>
                                {start_on ? `${dayjs(start_on).format("MMMM D.")} - ` : ""}
                            </span>
                            <span>{displayDueOnDate(due_on)}</span>
                        </p>
                        <div className="flex -space-x-2">
                            {
                                users.length > 0 &&
                                assignee.length > 0 &&
                                assignee.map((id, index) => {
                                    const { avatar_url, name } = users.filter(x => x.id === id)[0]
                                    return (
                                        <img
                                            key={index}
                                            src={avatar_url}
                                            alt={name}
                                            className="w-7 h-7 rounded-full"
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    {
                        selectedMenu === editMenu[0] &&
                        <ChangeTaskName name={name} id={id}/>
                    }
                    {
                        selectedMenu === editMenu[1] &&
                        <ChangeTaskMembers assignee={assignee} id={id}/>
                    }
                    {
                        selectedMenu === editMenu[2] &&
                        <ChangeTaskLabels labels={labels} id={id}/>
                    }

                </div>
                <div className="p-2 flex flex-col justify-between">
                    <div>
                    {
                        editMenu.map(menuItem => {
                            return (
                                <button key={menuItem} onClick={() => { setSelectedMenu(menuItem) }} className="w-full my-2 block text-white bg-violet-700 px-3 py-1 rounded-md shadow-md">
                                    {menuItem}
                                </button>
                            )
                        })
                    }
                    </div>
                    <button onClick={closeFn} className="w-full my-2 mt-4 block text-white bg-violet-700 px-3 py-1 rounded-md shadow-md">
                        Close
                    </button>
                </div>

            </div>
        </Modal>
    )
}