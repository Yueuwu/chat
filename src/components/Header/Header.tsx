import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Button, Link } from "@mui/material"
import { SignIn, SignOut } from "../../redux/AuthSlice"
import { useAppDispatch } from "../../app/hooks"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase"

const Header: React.FC = () => {
	const dispatch = useAppDispatch()

	const [user, loading] = useAuthState(auth)

	const signHandler = () => [dispatch(user ? SignOut() : SignIn())]

	return (
		<Box sx={{ width: "100%", marginBottom: "1vmin" }}>
			<AppBar sx={{ backgroundColor: "success.main" }} position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Online Chat by{" "}
						<Link
							color="InfoText"
							href="https://github.com/Yueuwu"
							underline="none"
						>
							Yueuwu
						</Link>
					</Typography>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 25 }}
					>
						{user && "Name: " + user?.displayName}
					</Typography>
					<div>
						<Button onClick={signHandler} color="inherit">
							<Typography variant="h6">
								{user ? "Sign Out" : "Sign In"}
							</Typography>
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Header
