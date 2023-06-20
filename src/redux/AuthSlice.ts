import { createSlice } from "@reduxjs/toolkit"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import {auth, provider} from '../firebase'

const initialState = {}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		SignIn: (state) => {
			signInWithPopup(auth, provider)
				.then((result) => {
					const credential = GoogleAuthProvider.credentialFromResult(
						result
					)
                    if (credential){
                        const token = credential.accessToken
                    }
					const user = result.user
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					const email = error.customData.email
					const credential = GoogleAuthProvider.credentialFromError(
						error
					)
				})
		},
        SignOut: state => {
            signOut(auth)
        },
		
	},
})

export const {SignIn, SignOut} = authSlice.actions
export default authSlice.reducer
