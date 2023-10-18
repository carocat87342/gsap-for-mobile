import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const animationSlicer = createSlice({
    name: 'animation',
    initialState,
    reducers: {
    },
})

export const {  } = animationSlicer.actions

export default animationSlicer.reducer