import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import homeReducer from "../reducers/homeReducer";
import dialogReducer from "../reducers/dialogReducer";
import friendsReducer from "../reducers/friendsReducer";
import authReducer from "../reducers/authReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer from "../reducers/appReducer";
import chatReducer from "../reducers/chat-reducer";

let reducers = combineReducers({
    homePage: homeReducer,
    dialogPage: dialogReducer,
    friendPage: friendsReducer,
    auth: authReducer,
    app: appReducer,
    chatReducer: chatReducer,
    form: formReducer
})

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

type PropertiesTypes<T> = T extends {[key:string]: infer U} ? U : never

export type InferActionsType<T extends {[key:string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
// @ts-ignore
window.store = store;

export default store;
