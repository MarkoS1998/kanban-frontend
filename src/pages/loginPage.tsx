import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApiStatusAction } from '../store/apiStatusReducer';
import Api from '../api';
import { RootState } from '../store/reducers';
import { setLoggenInUserAction } from '../store/loggedInUserReducer';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const apiStatus = useSelector((state: RootState) => state.apiStatus)
    const [cookies, setCookie] = useCookies(['kanban-user-id']);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const tryLogin = useCallback(async () => {
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.login({
            email: email,
            password: password
        })
            .then(response => {
                if (response.data.data !== null && response.data.code === 200) {
                    dispatch(setLoggenInUserAction(response.data.data));
                    setEmail("");
                    setPassword("");
                    setCookie("kanban-user-id", response.data.data.id)
                    dispatch(setApiStatusAction({ loading: false, success: true, message: "" }));
                    navigate('/task-lists')
                } else {
                    dispatch(setApiStatusAction({ loading: false, success: false, message: response.data.message }))
                }
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
    }, [dispatch, email, password, navigate])

    const getUser = useCallback(async () => {
        if(cookies['kanban-user-id'] !== undefined){
        dispatch(setApiStatusAction({ loading: true, success: true, message: "" }))
        await Api.getUserById(cookies['kanban-user-id'])
            .then(response => {
                
                if (response.data.data !== null && response.data.code === 200) {
                    dispatch(setLoggenInUserAction(response.data.data));
                    setEmail("");
                    setPassword("");
                    dispatch(setApiStatusAction({ loading: false, success: true, message: "" }));
                    navigate('/task-lists')
                } else {
                    dispatch(setApiStatusAction({ loading: false, success: false, message: response.data.message }))
                }
            })
            .catch(error => {
                dispatch(setApiStatusAction({ loading: false, success: false, message: error.message }))
            })
        }
    }, [dispatch, navigate, cookies])

    const handleSubmit = async () => {
        if (!email.trim() || !password.trim()) return;
        await tryLogin();
    }

    useEffect(()=>{
        getUser()
    },[cookies])

    return (
        <div className="flex justify-center w-screen h-screen items-center">
            <div className="w-4/5 p-4 max-w-sm flex flex-col bg-slate-100 shadow-lg rounded-md border-[1px]">
                <b>Log In</b>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-1 w-full my-1.5"
                    placeholder='Email'
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-1 w-full my-1.5"
                    placeholder='Password'
                    required
                />
                {
                    !apiStatus.success && apiStatus.message !== "" &&
                    <b className='text-violet-700'>{apiStatus.message}</b>
                }
                <button onClick={handleSubmit} className="my-1.5 block mt-3 text-white bg-violet-700 px-3 py-1 rounded-md shadow-md">
                    Submit
                </button>
            </div>
        </div>
    )
}