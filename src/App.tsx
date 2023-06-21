import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { SignIn, SignOut } from "./redux/AuthSlice"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { auth, firestore } from "./firebase"
import { collection } from "firebase/firestore"
import {
	sendMessage,
	storeSelector,
	changeMessage,
	setUser,
} from "./redux/StoreSlice"
import Header from "./components/Header/Header"
import Dialog from "./components/Dialog/Dialog"
import { User } from "firebase/auth"

const App: React.FC = () => {
	const dispatch = useAppDispatch()

	const { message } = useAppSelector(storeSelector)
	const [user, loading] = useAuthState(auth)

	const [value, load, error] = useCollection(
		collection(firestore, "messages"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	)

	useEffect(() => {
		if (user) {
			const userState = {
				userName: user.displayName,
				userPhoto: user.photoURL,
				userId: user.uid,
			}
			dispatch(setUser(userState))
		}
	}, [user])

	const writeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(changeMessage(event.target.value))
	}

	return (
		<div>
			<Header />
			{user ? (
				<Dialog {...user} />
			) : (
				<div>U have to sign in to read and send messages</div>
			)}
			<textarea
				value={message}
				onChange={(e) => writeMessage(e)}
			></textarea>
			<button onClick={() => user && dispatch(sendMessage())}>
				Send
			</button>
		</div>
	)
}

export default App
