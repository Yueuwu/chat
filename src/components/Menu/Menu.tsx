import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import React, { useState } from "react"

interface propsI {
    scrollUp: () => void
    scrollDown: () => void
}

const options = [
	{
		name: "Scroll to start",
		variant: 0,
	},
	{
		name: "Scroll to end",
		variant: 1,
	},
]

const MessageMenu: React.FC<propsI> = ({scrollDown, scrollUp}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = (variant: number) => {
		if (variant === 0) {
			scrollUp()
		} else if (variant === 1) {
			scrollDown()
		}
		setAnchorEl(null)
	}
	return (
		<div style={{position: 'sticky', zIndex: 99, right: 0, top: 0}}>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{options.map((option) => (
					<MenuItem
						key={option.variant}
						onClick={() => handleClose(option.variant)}
					>
						{option.name}
					</MenuItem>
				))}
			</Menu>
		</div>
	)
}

export default MessageMenu
