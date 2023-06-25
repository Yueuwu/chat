import React from "react"
import { propsI } from "../Dialog/Dialog"
import style from "./item.module.css"
import { Avatar } from "@mui/material"

const DialogItem: React.FC<propsI> = ({ data, isUser }) => {
	const styleHandler = () => {
		return {
			padding: "1vmin",
			width: "fit-content",
			marginLeft: isUser ? "auto" : "",
		}
	}

	return (
		<div style={styleHandler()} className={style.wrapper}>
            <Avatar sx={{maxWidth: '5vmin', maxHeight: '5vmin'}} src={data.userPhoto}/>
			 {data.message}
		</div>
	)
}

export default DialogItem
