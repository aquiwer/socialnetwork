import React from "react";
import {dialogActions} from "../../store/reducers/dialogReducer";
import {connect} from "react-redux";
import Dialog from "../../components/dialogs/Dialogs";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../store/store/redux-store";

type MapStateToProps = {
    dialogPage: any
    isAuth: boolean
}

type MapDispatchToProps = {
    sendMessage: (value: string) => void
}



let mapStateToProps = (state:AppStateType):MapStateToProps => {
    return {
        dialogPage: state.dialogPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch:any): MapDispatchToProps => {
    return {
        sendMessage: (value: string) => {
            dispatch(dialogActions.sendMessageAC(value))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialog);
