import { Box, Divider, Grid, CircularProgress, Fab } from "@mui/material"
import NavigationIcon from "@mui/icons-material/Navigation"
import { DocumentData, collection, orderBy, query } from "firebase/firestore"
import React, { useEffect, useRef } from "react"
import {
	useCollection,
	useCollectionData,
} from "react-firebase-hooks/firestore"
import { firestore } from "../../firebase"
import { User } from "firebase/auth"
import style from "./dialog.module.css"
import { messageI } from "../../redux/StoreSlice"
import DialogItem from "../DialogItem/DialogItem"

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

	useEffect(() => {
		scrollRefDown.current?.scrollIntoView()
	}, [value])

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<div className={style.Box}>
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
				{/* <Fab sx={{position: 'relative', right: '1vmin', bottom: '12vh', zIndex: 99}} variant="extended">
					<NavigationIcon sx={{ mr: 1 }} />
					Navigate
				</Fab> */}
				<div ref={scrollRefDown}></div>
			</div>
		</Box>
	)
}

export default Dialog
