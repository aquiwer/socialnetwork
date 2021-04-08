import {authAPI, ResultCodeEnum} from "../../api/api";
import {homeActions, setUserProfile} from "./homeReducer";
import {stopSubmit} from "redux-form";

export type InitialStateType = {
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean,
    isFetching: boolean,
}
const initialState: InitialStateType = {
    userId: null,
    login: null,
    email: null,
    isAuth: true,
    isFetching: true,
}
export const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            }
        case "IS_FETCHING":
            return {
                ...state, isFetching: action.condition
            }
        default:
            return state;
    }
}

export const authActions = {
    isFetching: (condition: boolean) => ({type: "IS_FETCHING", condition} as const),
    setUserData: (userId: number | null, login: string | null, email: string | null, condition: boolean | null) => ({
        type: "SET_USER_DATA",
        payload: {userId, login, email, condition}
    } as const)

}
export const authThunkCreator = () => {
    return async (dispatch: Function) => {
        let res = await authAPI.authMe()
        if (res.resultCode === ResultCodeEnum.Success) {
            let {id, login, email} = res.data;
            dispatch(authActions.setUserData(id, login, email, true));
        }

    }
}

export const getProfileThunkCreator = (userId: number) => {
    return async (dispatch: Function) => {
        let res = await authAPI.getProfile(userId)
        dispatch(setUserProfile(res))
    }
}

export const LoginThunkCreator = (email: string, password: string) => {
    return async (dispatch: Function) => {
        let res = await authAPI.login(email, password)
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(authThunkCreator());
        } else {
            let errorMessage = res.messages.length > 0 ? res.messages[0] : "Error"
            console.log(res.messages[0])
            dispatch(stopSubmit('login', {
                error: errorMessage
            }))
        }

    }
}
export const LogoutThunkCreator = () => {
    return async (dispatch: Function) => {
        let res = await authAPI.logout()
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(authActions.setUserData(null, null, null, false));
        }
    }
}

export default authReducer;