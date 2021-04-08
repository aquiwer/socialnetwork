import React from "react";
import '../../generalFiles/general.css'
import Header from "../../components/header/Header";
import {connect} from "react-redux";
import {LogoutThunkCreator} from "../../store/reducers/authReducer";
import {AppStateType} from "../../store/store/redux-store";

type MapStateToProps = {
    isAuth: boolean
    login: string | null
}

type MapDispatchToProps = {
    LogoutThunkCreator: () => void
}

type PropsType = MapStateToProps & MapDispatchToProps

class HeaderContainer extends React.Component<PropsType> {

    render() {

        return (
            <>
                <Header logout={this.props.LogoutThunkCreator} {...this.props}  />
            </>
        )
    }
}

let mapStateToProps = (state:AppStateType):MapStateToProps => {

    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }

}
export default connect(mapStateToProps, {
    LogoutThunkCreator
})(HeaderContainer);