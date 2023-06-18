import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import {auth, provider} from '../firebase'

interface stateI {
    isAuth: boolean
    name: string
    photo: string
    uid: string
}

const initialState: stateI = {
	isAuth: false,
    name: '',
    photo: '',
    uid: ''
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		SignIn: (state) => {
            console.log("HUI")
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

export const authSelector = (state: RootState) => state.auth
export const {SignIn, SignOut} = authSlice.actions
export default authSlice.reducer
