import {authThunkCreator} from "./authReducer";



const initialState = {
    initialized: true
}

export type InitialStateType = typeof initialState;

export const appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case "SET_INIT":
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const appActions = {
    setInit: (condition: boolean) => ({type: "SET_INIT", condition} as const)
}

export const initThunkCreator = () => {
    return (dispatch: Function) => {
        let promise = dispatch(authThunkCreator())
        Promise.all([promise])
            .then(() => {
                dispatch(appActions.setInit(true));
            })
    }
}


export default appReducer;