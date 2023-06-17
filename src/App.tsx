import React from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import {SignIn, SignOut, auth, authSelector} from './redux/AuthSlice'
import { useAuthState } from "react-firebase-hooks/auth"


const App: React.FC = () => {
	const dispatch = useAppDispatch()
	const {isAuth} = useAppSelector(authSelector)
	const [user, loading] = useAuthState(auth)
    console.log(!loading && user?.displayName)
	
	return (
	<div>
		<button onClick={() => dispatch(SignIn())}>SignIn</button>
		<button onClick={() => dispatch(SignOut())}>SignOut</button>
		<>name: {user?.displayName}</>
	</div>
)}

export default App
