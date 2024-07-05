import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

import { loadingBarMiddleware } from './middlewares/loadingBar'
const middlewares = [loadingBarMiddleware];
export const store = configureStore({
  reducer: rootReducer,
  middleware: () => [...middlewares],
})