import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { firestore } from "../firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

export interface messageI {
	message: string
	userName: string
	userPhoto: string
	userId: string
}

const initialState: messageI = {
	message: '',
	userName: '',
	userPhoto: '',
	userId: '',
}

export const storeSlice = createSlice({
	name: "firestore",
	initialState,
	reducers: {
		sendMessage: (state) => {
			addDoc(collection(firestore, "messages"), {
				message: state.message,
				userName: state.userName,
				userPhoto: state.userPhoto,
				userId: state.userId,
				createdAt: serverTimestamp(),
			})
			state.message = ''
		},
		changeMessage: (state, action) => {
			state.message = action.payload
		},
		setUser: (state, action) => {
			state.userName = action.payload.userName
			state.userPhoto = action.payload.userPhoto
			state.userId = action.payload.userId
		},
	},
})

export const storeSelector = (state: RootState) => state.firestore
export const { sendMessage, changeMessage, setUser } = storeSlice.actions
export default storeSlice.reducer
