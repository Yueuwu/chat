import React from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { SignIn, SignOut, authSelector } from "./redux/AuthSlice"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { auth, firestore } from "./firebase"
import { collection } from "firebase/firestore"
import { sendMessage } from "./redux/StoreSlice"

const App: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector(authSelector)
	const [user, loading] = useAuthState(auth)
	
	const [value, load, error] = useCollection(collection(firestore, "users"), {
		snapshotListenOptions: { includeMetadataChanges: true },
	})

	value?.docs.map((doc) => {
		console.log(JSON.stringify(doc.data()))
	})

	return (
		<div>
			<button onClick={() => dispatch(SignIn())}>SignIn</button>
			<button onClick={() => dispatch(SignOut())}>SignOut</button>
			<>name: {user?.displayName}</>
			<button onClick={() => dispatch(sendMessage())}>Send</button>
		</div>
	)
}

export default App
