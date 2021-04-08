import {followAPI, ResultCodeEnum, usersAPI} from "../../api/api";
import {FriendType} from "../../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "../store/redux-store";

export type initialStateType = {
    users: FriendType,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    searchError: boolean,
    userId: number
};

const initialState = {
    users: [] as Array<FriendType>,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followed: false,
    userId: 0,
    searchError: false,
    filter: {
        term: " ",
        friend: null as null | boolean
    },
}

export type InitialState = typeof initialState;

export type FilterType = typeof initialState.filter;

export const homeReducer = (state = initialState, action: any): InitialState => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.type) {
                        return {
                            ...user, followed: true
                        }
                    }
                    return user
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return {
                            ...user, followed: false
                        }
                    }
                    return user
                })
            }
        case "SET_USERS":
            return {
                ...state, users: action.users
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state, currentPage: action.currentPage
            }
        case "SET_TOTAL_COUNT":
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case "IS_FETCHING":
            return {
                ...state, isFetching: action.condition
            }
        case "SET_USER_ID":
            return {
                ...state, userId: action.id
            }
        case "SET_SEARCH_ERROR":
            return {
                ...state, searchError: action.condition
            }
        case "SET_TERM": {
            return {
                ...state, filter: action.payload
            }

        }
        default:
            return state;
    }
}

type ActionsType = InferActionsType<typeof actions>

export const actions = {
    follow: (userID: number) => ({type: "FOLLOW", userID} as const),
    unFollow: (userID: number) => ({type: "UNFOLLOW", userID} as const),
    setUsers: (users: object) => ({type: "SET_USERS", users} as const),
    setFilter: (filter: FilterType) => ({type: "SET_TERM", payload: filter} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setTotalCount: (totalCount: number) => ({type: "SET_TOTAL_COUNT", totalCount} as const),
    isFetching: (condition: boolean) => ({type: "IS_FETCHING", condition} as const),
    setUserId: (id: number) => ({type: "SET_USER_ID", id} as const),
    setSearchError: (condition: boolean) => ({type: "SET_SEARCH_ERROR", condition} as const),
}


export const getUsersThunkCreator = (currentPage = 1, pageSize = 10, filter: FilterType): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => {
    return async (dispatch) => {
        dispatch(actions.isFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(actions.setTotalCount(data.totalCount))
        dispatch(actions.setFilter(filter))
        dispatch(actions.setCurrentPage(pageSize))
        dispatch(actions.setUsers(data.items));
        dispatch(actions.isFetching(false));
    }
}

export const followThunk = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => {
    return async (dispatch) => {
        let res = await followAPI.toFollow(userId)
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.unFollow(userId));
        }

    }
}

export const unFollowThunk = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => {
    return async (dispatch) => {
        let res = await followAPI.toUnFollow(userId)
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.follow(userId))
        }

    }
}

export default homeReducer;