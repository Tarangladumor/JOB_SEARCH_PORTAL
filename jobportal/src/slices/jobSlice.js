import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    job : null,
    editJob : false,
    apply : false
}

const jobSlice = createSlice({
    name:"job",
    initialState: initialState,
    reducers : {
        setJob(state, value){
            state.token = value.payload;
        },
        setEditJob(state, value){
            state.signupData = value.payload;
        },
        setApply(state, value){
            state.loading = value.payload;
        }
    }
}) ;

export const {setApply, setEditJob, setJob} = jobSlice.actions
export default jobSlice.reducer