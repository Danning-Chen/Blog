import { createSlice, type Dispatch } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken } from "../../utils";
import { loginAPI } from "../../apis/user";
import type { LoginDTO } from "../../types";

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

const fetchLogin = (loginDTO: LoginDTO) => {
    return async (dispatch: Dispatch) => {
        const res = await loginAPI(loginDTO)
        dispatch(setToken(res.data.token))
        return res;
    }
}



export { fetchLogin, setToken, clearUserInfo }

export default userReducer