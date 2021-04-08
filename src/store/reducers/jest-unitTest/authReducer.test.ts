import friendsReducer, {actions, InitialState} from "../friendsReducer";
import {FriendType} from "../../../types/types";

let state:InitialState;

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: "Dima", followed: false, photos: null, status: "Hi"},
            {id: 1, name: "Dima2", followed: true, photos: null, status: "Hi"},
            {id: 2, name: "Dima3", followed: false, photos: null, status: "Hi"},
            {id: 3, name: "Dima4", followed: true, photos: null, status: "Hi"}
        ],
        pageSize: 50,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followed: false,
        userId: 0,
    }
})
("fs", () => {

   const newState =  friendsReducer(state, actions.follow(0))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

("ufs", () => {

    const newState =  friendsReducer(state, actions.unFollow(1))

    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})