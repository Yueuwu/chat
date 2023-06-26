import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"
import Header from "./components/Header/Header"
import Dialog from "./components/Dialog/Dialog"
import Send from "./components/Send/Send"
import { Box } from "@mui/material"

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
				<Box sx={{textAlign: 'center'}}>
					<h1>You have to sign in via google to read and send messages</h1>
				</Box>
			)}
		</div>
	)
}

export default App
