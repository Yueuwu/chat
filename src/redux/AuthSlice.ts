import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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
					// This gives you a Google Access Token. You can use it to access the Google API.
					const credential = GoogleAuthProvider.credentialFromResult(
						result
					)
                    if (credential){
                        const token = credential.accessToken
                    }
					// The signed-in user info.
					const user = result.user
					// IdP data available using getAdditionalUserInfo(result)
					// ...
                    console.log(user)
                    // state.isAuth = true
                    // if (user.displayName){
                    //     state.name = user.displayName
                    // }
                    // if (user.photoURL){
                    //     state.photo = user.photoURL
                    // } else {
                    //     state.photo = 'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'
                    // }
                    // state.uid = user.uid
				})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code
					const errorMessage = error.message
					// The email of the user's account used.
					const email = error.customData.email
					// The AuthCredential type that was used.
					const credential = GoogleAuthProvider.credentialFromError(
						error
					)
				})
		},
        SignOut: state => {
            console.log('воркаю мля')
            signOut(auth)
        },
		
	},
})

export const authSelector = (state: RootState) => state.auth
export const {SignIn, SignOut} = authSlice.actions
export default authSlice.reducer
