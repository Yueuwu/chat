import { Box, Divider, Grid } from "@mui/material"
import { DocumentData, collection, orderBy, query } from "firebase/firestore"
import React from "react"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { firestore } from "../../firebase"
import { User } from "firebase/auth"
import style from './dialog.module.css'
import { messageI } from "../../redux/StoreSlice"
import DialogItem from "../DialogItem/DialogItem"

interface fullmessageI extends messageI {
	createdAt: {nanoseconds: string, seconds: string}
}
export interface propsI {
	data: fullmessageI
    isUser: boolean
}

const Dialog: React.FC<User> = (user) => {

	const [value, loading, error] = useCollection(
        query(
            collection(firestore, "messages"),
            orderBy('createdAt')
            )
	)
	
	const propsMaker = (data: DocumentData): propsI => {
		const propsData: fullmessageI = {
			message: data.message,
			userName: data.userName,
			userId: data.userId,
			userPhoto: data.userPhoto,
			createdAt: data.createdAt
		}
		const isUser = data.userId === user.uid
		return {data: propsData, isUser: isUser}
	}

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<div className={style.Box}>
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
							<DialogItem {...propsMaker(doc.data())}/>
                            {/* {
                                <div style={{
                                    padding: '1vmin',
                                    width: 'fit-content',
                                    marginLeft: doc.data().userId === user.uid ? 'auto' : '',
                                    
                                }}>
                                    {JSON.stringify(doc.data().message)}
                                </div>
                            } */}
                            <Divider/>
						</Grid>
					))}
				</Grid>
			</div>
		</Box>
	)
}

export default Dialog
