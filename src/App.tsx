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
import Send from "./components/Send/Send"

const App: React.FC = () => {
	const [user, loading] = useAuthState(auth)

	return (
		<div style={{ background: "#EDFEE8", height: "100vh" }}>
			<Header />
			{user ? (
				<>
					<Dialog {...user} />
					<Send {...user} />
				</>
			) : (
				<div>U have to sign in to read and send messages</div>
			)}
		</div>
	)
}

export default App
