import { Box, Grid, CircularProgress } from "@mui/material"
import { DocumentData, collection, orderBy, query } from "firebase/firestore"
import React, { useEffect, useRef } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { firestore } from "../../firebase"
import { User } from "firebase/auth"
import style from "./dialog.module.css"
import { messageI } from "../../redux/StoreSlice"
import DialogItem from "../DialogItem/DialogItem"
import MessageMenu from "../Menu/Menu"

interface fullmessageI extends messageI {
	createdAt: { nanoseconds: string; seconds: string }
}
export interface propsI {
	data: fullmessageI
	isUser: boolean
}

const Dialog: React.FC<User> = (user) => {
	const scrollRefDown = useRef<HTMLDivElement | null>(null)
	const scrollRefUp = useRef<HTMLDivElement | null>(null)

	const [value, loading, error] = useCollection(
		query(collection(firestore, "messages"), orderBy("createdAt"))
	)

	const propsMaker = (data: DocumentData): propsI => {
		const propsData: fullmessageI = {
			message: data.message,
			userName: data.userName,
			userId: data.userId,
			userPhoto: data.userPhoto,
			createdAt: data.createdAt,
		}
		const isUser = data.userId === user.uid
		return { data: propsData, isUser: isUser }
	}

	const scrollUp = () => {
		scrollRefUp.current?.scrollIntoView()
	}
	const scrollDown = () => {
		scrollRefDown.current?.scrollIntoView()
	}

	useEffect(scrollDown, [value])

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<div className={style.Box}>
				<MessageMenu scrollDown={scrollDown} scrollUp={scrollUp} />
				<div ref={scrollRefUp}></div>
				{loading ? (
					<div className={style.loader}>
						<CircularProgress color="success" />
					</div>
				) : (
					<>
						<Grid
							container
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
							}}
						>
							{value?.docs.map((doc, index) => (
								<Grid key={index} xs={12}>
									<DialogItem {...propsMaker(doc.data())} />
								</Grid>
							))}
						</Grid>
					</>
				)}
				<div ref={scrollRefDown}></div>
			</div>
		</Box>
	)
}

export default Dialog
