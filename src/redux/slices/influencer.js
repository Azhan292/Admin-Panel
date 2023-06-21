import { createSlice } from "@reduxjs/toolkit";

const influencerslice = createSlice(
    {
        initialState:{
            influencerdata:{
                promodata:[]
            }
        },
        name:'influencer',
        reducers:{
            influencerfun:(state,action)=>{
                state.influencerdata.promodata.push(action.payload) 
            }
            
        }
    }
    )
    export default influencerslice.reducer;
    export const {influencerfun} = influencerslice.actions

 
