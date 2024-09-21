import { createSlice } from "@reduxjs/toolkit";

const clubSlice = createSlice({
    name:"club",
    initialState:{
        singleClub:null,
        clubs:[],
        searchClubByText:"",
    },
    reducers:{
        // actions
        setSingleClub:(state,action) => {
            state.singleClub = action.payload;
        },
        setClubs:(state,action) => {
            state.clubs = action.payload;
        },
        setSearchClubByText:(state,action) => {
            state.searchClubByText = action.payload;
        }
    }
});
export const {setSingleClub, setClubs,setSearchClubByText} = clubSlice.actions;
export default clubSlice.reducer;