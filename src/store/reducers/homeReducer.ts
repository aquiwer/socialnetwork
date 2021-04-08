import avatar from '../../assets/imgs/home/unnamed.jpg'
import {ResultCodeEnum, usersAPI} from "../../api/api";
import {PhotosType, PostType, ProfileType} from '../../types/types';


type countsType = {
    friendsCount: number,
    subsCount: number,
    photoCount: number,
    videoCount: number,
}


const initialState = {
    posts: [
        {
            id: 0,
            author: "Elon Musk",
            post: "My first post",
            photo: 'https://img.pngio.com/-high-quality-hamtaro-transparent-png-images-png-mix-hamtaro-transparent-200_200.png'
        },
        {
            id: 2,
            author: "Dmitrii Alekseenko",
            post: "My second post",
            photo: 'https://img.pngio.com/-high-quality-hamtaro-transparent-png-images-png-mix-hamtaro-transparent-200_200.png'
        },
        {
            id: 3,
            author: "Maks Kravchenko",
            post: "My third post",
            photo: 'https://img.pngio.com/-high-quality-hamtaro-transparent-png-images-png-mix-hamtaro-transparent-200_200.png'
        },
        {
            id: 4,
            author: "Elik <3",
            post: "My fourth post",
            photo: 'https://img.pngio.com/-high-quality-hamtaro-transparent-png-images-png-mix-hamtaro-transparent-200_200.png'
        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    counts: {
        friendsCount: 344,
        subsCount: 222,
        photoCount: 6,
        videoCount: 11
    } as countsType,
    status: "Not Found",
}

export type initialStatesType = typeof initialState;

export const homeReducer = (state = initialState, action: any): initialStatesType => {

    switch (action.type) {
        case "ADD_POST":
            return {
                ...state,
                posts: [...state.posts, {id: 4, author: "Dmytro Kazantsev", post: action.value, photo: avatar}],
            }
        case "SET_USER_PROFILE":
            return {
                ...state, profile: action.profile
            }
        case "SET_STATUS":
            return {
                ...state, status: action.status
            }
        case "SET_PHOTO":
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

export const homeActions = {

    setStatus: (status: any) => ({type: "SET_STATUS", status}),
    setPhoto: (photos: PhotosType) => ({type: "SET_PHOTO", photos}),

}
export const addNewPost = (value: string) => ({type: "ADD_POST", value})
export const setUserProfile = (profile: ProfileType) => ({type: "SET_USER_PROFILE", profile})
export const getUserStatusThunkCreator = (userId: number) => {
    return async (dispatch: Function) => {
        let res = await usersAPI.getStatus(userId)
        dispatch(homeActions.setStatus(res))

    }
}

export const UpdateStatusThunkCreator = (status: string) => {
    return async (dispatch: Function) => {
        let data = await usersAPI.updateStatus(status)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(homeActions.setStatus(status))
        }

    }
}

export const savePhotoThunkCreator = (photo: PhotosType) => {
    return async (dispatch: Function) => {
        let data = await console.log(true)

    }
}
export const sendInfoThunkCreator = (profile: ProfileType) => {
    return async (dispatch: Function) => {
        let data = await console.log(true)
    }
}
export default homeReducer;