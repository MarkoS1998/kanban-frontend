import { useSelector } from "react-redux"
import { RootState } from "../store/reducers"
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggenInUserAction } from "../store/loggedInUserReducer";

export default function Header() {

    const loggedInUser = useSelector((state: RootState) => state.loggedInUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['kanban-user-id']);

    const handleLogOut = () => {
        dispatch(setLoggenInUserAction({
            id: -1,
            name: "",
            avatar_url: ""
        }))
        removeCookie("kanban-user-id")
        navigate('/')
    }

    return (
        <div className="fixed w-full z-50 flex justify-between top-0 left-0 right-0 p-1.5 items-center bg-slate-100 shadow-lg" >
            <div className="flex items-center">
                <img
                    src={loggedInUser.avatar_url}
                    alt={loggedInUser.name}
                    className="w-7 h-7 rounded-full"
                />
                <b className="outline-none mx-1" >{loggedInUser.name}</b>
            </div>
            <button onClick={handleLogOut} className=" block text-white bg-violet-700 px-3 py-1 rounded-md shadow-md">
                Log Out
            </button>
        </div>
    )
}