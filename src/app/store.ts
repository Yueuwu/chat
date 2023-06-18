import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import auth from '../redux/AuthSlice';
import firestore from '../redux/StoreSlice'

export const store = configureStore({
  reducer: {
    auth,
    firestore
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;