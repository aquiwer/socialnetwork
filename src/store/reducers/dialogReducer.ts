
type DialogType = {
    id: number | null,
    name: string | null,
    photo: string | null,
}
type MessageType = {
    id: number | null,
    message: string | null,

}

const initialState = {
    dialogData: [
        {name: "Sveta Kraun", id: 1, photo: "https://cdn.freelance.ru/images/att/1324133_900_600.png"},
        {name: "Liza Kraun", id: 2, photo: "https://avatarko.ru/img/kartinka/2/Gubka_Bob.jpg"},
        {
            name: "Karina Kraun",
            id: 3,
            photo: "https://cs11.pikabu.ru/post_img/big/2020/04/12/9/1586704514168132921.png"
        }
    ] as Array<DialogType>,
    dialogMessages: [
        {id: 0, message: "Hello!"},
        {id: 1, message: "Hi!"},
        {id: 2, message: "lorem how are u>!"},
    ] as Array<MessageType>,
}

export type initialStateDialogsType = typeof initialState;
const dialogReducer = (state = initialState, action: any): initialStateDialogsType => {


    switch (action.type) {

        case "SEND_MESSAGE":
            let message = action.value
            return {
                ...state,
                dialogMessages: [...state.dialogMessages, {id: 532141234, message: message},],
            }
        default: {
            return state;
        }
    }
}
export const dialogActions = {
    sendMessageAC: (value: any) => ({type: "SEND_MESSAGE", value})
}

export default dialogReducer;