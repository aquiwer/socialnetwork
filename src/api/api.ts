import axios from "axios";
import {PhotosType, ProfileType} from "../types/types";

let instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "b9d14bd1-666c-4dd9-948b-b9a3a4197f7d",
    }
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    Captcha = 10
}

type AuthTypes = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginTypes = {
    data: { userId: number }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}

type GetUsersType = {
    items: {
        id: number
        name: string
        status?: string
        photos: PhotosType
        followed: boolean
    }
    totalCount: number
    error: string
}

type GetStatusType = {
    resultCode: ResultCodeEnum
    messages: Array<any>
    data: object
}

type FollowType = {
    data: {
        resultCode: ResultCodeEnum
        messages: Array<string>
        data: object
    }
    resultCode: ResultCodeEnum
}
export let usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = " ", friend: null | boolean = null) {
        return (
            instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? " " : `&friend=${friend}`)).then(res => res.data)
        );
    },
    getStatus(userId: number) {
        return (
            instance.get<{ userId: number }>(`profile/status/${userId}`).then(res => res.data)
        );
    },
    updateStatus(status: string) {
        return (
            instance.put<GetStatusType>(`profile/status`, {
                status: status
            }).then(res => res.data)
        );
    },
}


export let authAPI = {
    authMe() {
        return (
            instance.get<AuthTypes>(`auth/me`).then(res => res.data)
        );
    },
    login(email: string, password: string) {
        return (
            instance.post<LoginTypes>(`auth/login`, {email, password}).then(res => res.data)
        );
    },
    logout() {
        return (
            instance.delete<LoginTypes>(`auth/login`).then(res => res.data)
        );
    },
    getProfile(userId: number) {
        return (
            instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
        )
    },
}


export let followAPI = {
    toFollow(userId: number) {
        return (
            instance.post<FollowType>(`follow/${userId}`).then(res => res.data)
        );
    },
    toUnFollow(userId: number) {
        return (
            instance.delete<FollowType>(`follow/${userId}`, {}).then(res => res.data)
        );
    }
}
