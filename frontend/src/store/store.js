import { configureStore } from '@reduxjs/toolkit'
import langSlice from './redusers/languageSlice'
const store = configureStore({
    reducer: {
        lang: langSlice,
    }
})

export default store