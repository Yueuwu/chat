import React from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { SignIn, SignOut, authSelector } from "./redux/AuthSlice"
import { useAuthState } from "react-firebase-hooks/auth"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { auth, firestore } from "./firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"

const App: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector(authSelector)
	const [user, loading] = useAuthState(auth)
	console.log(!loading && user?.displayName)

	const f = async () => {
		const querySnapshot = await getDocs(collection(firestore, "users"))
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`)
		})
	}

	const s = async () => {
		try {
			const docRef = await addDoc(collection(firestore, "users"), {
				first: "Ada",
				last: "Lovelace",
				born: 1815,
			})
			console.log("Document written with ID: ", docRef.id)
		} catch (e) {
			console.error("Error adding document: ", e)
		}
	}

	return (
		<div>
			<button onClick={() => dispatch(SignIn())}>SignIn</button>
			<button onClick={() => dispatch(SignOut())}>SignOut</button>
			<>name: {user?.displayName}</>
			<button onClick={f}>Read</button>
			<button onClick={s}>Send</button>
		</div>
	)
}

export default App
