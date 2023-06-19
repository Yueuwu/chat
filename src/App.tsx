import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { SignIn, SignOut, authSelector } from "./redux/AuthSlice"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { auth, firestore } from "./firebase"
import { collection } from "firebase/firestore"
import { sendMessage, storeSelector, changeMessage, setUser } from "./redux/StoreSlice"

const App: React.FC = () => {
	const dispatch = useAppDispatch()

	const { isAuth } = useAppSelector(authSelector)
	const { message } = useAppSelector(storeSelector)
	const [user, loading] = useAuthState(auth)

	const [value, load, error] = useCollection(collection(firestore, "messages"), {
		snapshotListenOptions: { includeMetadataChanges: true },
	})

	useEffect(() => {
		if (user){
			const userState = {
				userName: user.displayName,
				userPhoto: user.photoURL,
				userId: user.uid
			}
			dispatch(setUser(userState))
		} else if (!loading) {
			alert("U have to sign in")
		}
	}, [user])

	const writeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(changeMessage(event.target.value))
	}

	return (
		<div>
			<button onClick={() => dispatch(SignIn())}>SignIn</button>
			<button onClick={() => dispatch(SignOut())}>SignOut</button>
			<>name: {user?.displayName}</>
			<textarea value={message} onChange={(e) => writeMessage(e)}></textarea>
			<button onClick={() => user && dispatch(sendMessage())}>Send</button>
			<>
				{!load && value?.docs.map((d, i) => {
					return <li key={i}>`${JSON.stringify(d.data())}`</li>
				})}
			</>
		</div>
	)
}

export default App
