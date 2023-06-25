import { Box, Button, TextField } from "@mui/material"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
	sendMessage,
	storeSelector,
	changeMessage,
	setUser,
} from "../../redux/StoreSlice"
import { User } from "firebase/auth"

const Send: React.FC<User> = (user) => {
	const dispatch = useAppDispatch()
	const { message } = useAppSelector(storeSelector)

	useEffect(() => {
		const userState = {
			userName: user.displayName,
			userPhoto: user.photoURL,
			userId: user.uid,
		}
		dispatch(setUser(userState))
	}, [user])

	useEffect(() => {
		const onKeypress = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				sendMessageHandler()
			}
		}
		document.addEventListener("keypress", onKeypress)
		return () => {
			document.removeEventListener("keypress", onKeypress)
		}
	}, [message])

	const changeMessageHandler = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		dispatch(changeMessage(event.target.value))
	}
	const sendMessageHandler = () => {
		if (message) {
			dispatch(sendMessage())
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				marginTop: "2vmin",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					width: "70vw",
				}}
			>
				<TextField
					sx={{
						width: "89%",
					}}
					label="Enter message"
					variant="outlined"
					color="success"
					value={message}
					onChange={changeMessageHandler}
				/>
				<Button
					sx={{
						width: "10%",
					}}
					variant="contained"
					color="success"
					onClick={sendMessageHandler}
				>
					Send
				</Button>
			</Box>
		</Box>
	)
}
export default Send
