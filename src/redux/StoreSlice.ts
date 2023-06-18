import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { firestore } from "../firebase"
import { addDoc, collection } from "firebase/firestore"

const initialState = {
	message: "",
}

export const storeSlice = createSlice({
	name: "firestore",
	initialState,
	reducers: {
		sendMessage: state => {
			addDoc(collection(firestore, "users"), {
				first: "AdaN",
				last: "Lovelace",
				born: 1815,
			})
		},
	},
})

export const { sendMessage } = storeSlice.actions

export default storeSlice.reducer
