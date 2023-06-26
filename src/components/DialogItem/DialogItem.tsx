import React, { useEffect, useState } from "react"
import { propsI } from "../Dialog/Dialog"
import style from "./item.module.css"
import { Avatar } from "@mui/material"

const DialogItem: React.FC<propsI> = ({ data, isUser }) => {
	const styleHandler = () => {
		return {
			width: "fit-content",
			marginLeft: isUser ? "auto" : "",
		}
	}

	const date = new Date(
		Number(data.createdAt?.seconds + "000")
	)?.toLocaleDateString()

	return (
		<div style={styleHandler()} className={style.wrapper}>
			<div
				style={{
					flexDirection: isUser ? "row-reverse" : "row",
					justifyContent: isUser ? "end" : "start",
				}}
				className={style.top}
			>
				<Avatar
					sx={{
						maxWidth: "4vmin",
						maxHeight: "4vmin",
						margin: "0 1vmin",
					}}
					src={data.userPhoto}
				/>
				<br />
				<h5>{data.userName}</h5>
			</div>
			<div className={style.mid}>
				<p>{data.message}</p>
			</div>
			<div className={style.bottom}>
				<p>{date}</p>
			</div>
		</div>
	)
}

export default DialogItem
