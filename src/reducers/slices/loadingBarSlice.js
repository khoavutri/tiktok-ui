import { createSlice } from "@reduxjs/toolkit";

const initStageLoading = {
    showPage:false,
}

const loadingBarSlice = createSlice({
    name:'loadingBar',
    initialState:initStageLoading,
    reducers:{
        setShowPage:(stage,action)=>{
            stage.showPage = action.payload
        }
    }
})
export const {setShowPage} = loadingBarSlice.actions
export default loadingBarSlice.reducer