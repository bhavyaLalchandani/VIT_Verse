import { createSlice } from "@reduxjs/toolkit";

const positionSlice = createSlice({
    name:"position",
    initialState:{
        allPositions:[],
        allAdminPositions:[],
        singlePosition:null, 
        searchPositionByText:"",
        allAppliedPositions:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllPositions:(state,action) => {
            state.allPositions = action.payload;
        },
        setSinglePosition:(state,action) => {
            state.singlePosition = action.payload;
        },
        setAllAdminPositions:(state,action) => {
            state.allAdminPositions = action.payload;
        },
        setSearchPositionByText:(state,action) => {
            state.searchPositionByText = action.payload;
        },
        setAllAppliedPositions:(state,action) => {
            state.allAppliedPositions = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {
    setAllPositions, 
    setSinglePosition, 
    setAllAdminPositions,
    setSearchPositionByText, 
    setAllAppliedPositions,
    setSearchedQuery
} = positionSlice.actions;
export default positionSlice.reducer;