import { Box, Divider, Grid } from "@mui/material"
import { collection, orderBy, query } from "firebase/firestore"
import React from "react"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { firestore } from "../../firebase"
import { User } from "firebase/auth"

const Dialog: React.FC<User> = (user) => {
	const [value, loading, error] = useCollection(
        query(
            collection(firestore, "messages"),
            orderBy('createdAt')
            )
	)

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Box sx={{ border: "1px solid black", width: "70vw", height: '70vh', overflow: 'auto' }}>
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
                            {
                                <div style={{
                                    padding: '1vmin',
                                    width: 'fit-content',
                                    marginLeft: doc.data().userId === user.uid ? 'auto' : '',
                                    
                                }}>
                                    {JSON.stringify(doc.data().message)}
                                </div>
                            }
                            <Divider/>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	)
}

export default Dialog
