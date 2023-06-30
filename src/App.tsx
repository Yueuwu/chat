import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase"
import Header from "./components/Header/Header"
import Dialog from "./components/Dialog/Dialog"
import Send from "./components/Send/Send"
import { Box, Typography } from "@mui/material"
import "./App.css"

const App: React.FC = () => {
	const [user] = useAuthState(auth)

	return (
		<div>
			<Header />
			{user ? (
				<>
					<Dialog {...user} />
					<Send {...user} />
				</>
			) : (
				<Box sx={{ textAlign: "center" }}>
					<Typography variant="h4">
						You have to sign in via google to read and send messages
					</Typography>
				</Box>
			)}
		</div>
	)
}

export default App
