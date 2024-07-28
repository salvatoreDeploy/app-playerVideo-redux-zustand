import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { player } from './slices/player'

/* const todoSlice = createSlice({
  name: '',
  initialState: [],

  reducers: {},
})

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
}) */

export const store = configureStore({
  reducer: {
    player,
  },
})

// export const {} = todoSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
