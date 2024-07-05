import { setShowPage } from "../../reducers/slices/loadingBarSlice"

const loadingBarMiddleware = (store) => (next) => (action) =>{
    if (action.type.endsWith('pending')){
        store.dispatch(setShowPage(true))
    } else if (action.type.endsWith('fulfilled') || action.type.endsWith('rejected')){
        store.dispatch(setShowPage(false))
    }
    next(action);
}

export {loadingBarMiddleware}