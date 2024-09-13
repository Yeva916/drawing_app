import { createSlice } from '@reduxjs/toolkit'
import { MENU_ITEMS } from '@/constants'
const initialState = {
    activeMenuItem:MENU_ITEMS.PENCIL,
    actionMenuItem:''
}

export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
       menuItemClick:(state,action)=>{
        // console.log(action.payload)
            state.activeMenuItem=action.payload
       },
       actionItemClick:(state,action)=>{
        state.actionMenuItem=action.payload
       }
       
    }
})
// console.log(menuSlice.reducer)
export const {menuItemClick, actionItemClick} = menuSlice.actions

export default menuSlice.reducer