import { configureStore } from '@reduxjs/toolkit'
import {animationSlicer} from "./features/animationSlicer";

export const store = configureStore({
    reducer: {
        animation: animationSlicer,
    },
})