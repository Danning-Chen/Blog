import { createSlice, type Dispatch } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken } from "../../utils";

interface UserState {
    token : string,
    userInfo: object
}

const initialState: UserState = {
    token: localStorage.getItem('token_key') || '',
    userInfo: {}
}

const userStore = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            //localstorage 存一份
            _setToken(action.payload)
        },
        //设置用户信息
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

const userReducer = userStore.reducer

export default userReducer