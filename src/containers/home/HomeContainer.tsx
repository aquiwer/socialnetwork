import React from "react";
import {
    addNewPost,
    getUserStatusThunkCreator,
    savePhotoThunkCreator,
    sendInfoThunkCreator,
    setUserProfile,
    UpdateStatusThunkCreator
} from "../../store/reducers/homeReducer";
import Home from "../../components/feed/Home";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getProfileThunkCreator} from "../../store/reducers/authReducer";
import {compose} from "redux";
import {AppStateType} from "../../store/store/redux-store";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    homePage: any,
    profilePage: any,
    isAuth: boolean
    status: string
    authUserId: number
    userId: string
    history: any
}
type MapDispatchPropsType = {
    getProfileThunkCreator: (userId:number) => void
    getUserStatusThunkCreator: (userId:number) => void
    sendInfoThunkCreator: () => void,
    savePhotoThunkCreator: (page: number, count: number) => void,
    UpdateStatusThunkCreator: (status: string) => void,
}
type PropsType = MapDispatchPropsType & MapStatePropsType

class HomeApiContainer extends React.Component<PropsType & RouteComponentProps<PathParamsType>> {
    refreshProfile(){
        let userId = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId
            if(!userId){
                this.props.history.push('/login');
            }
        }
        this.props.getProfileThunkCreator(userId)
        this.props.getUserStatusThunkCreator(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) {
      if(this.props.match.params.userId !== prevProps.match.params.userId){
          this.refreshProfile()
      }
    }

    render() {
        return (
            <div>
                <Home
                    sendInfo={this.props.sendInfoThunkCreator}
                    savePhoto={this.props.savePhotoThunkCreator}
                    isOwner={!this.props.match.params.userId}
                    UpdateStatus={this.props.UpdateStatusThunkCreator}
                    {...this.props} status={this.props.status}
                    profile={this.props.profilePage}/>
            </div>
        );
    }
}

// let authRedirectComponent = withAuthRedirect(HomeApiContainer)

let mapStateToProps = (state:AppStateType) => {
    return {
        homePage: state.homePage,
        profilePage:state.homePage.profile,
        isAuth: state.auth.isAuth,
        status: state.homePage.status,
        authUserId:state.friendPage.userId
    }

}
// let withUrlDataContComponent = withRouter(authRedirectComponent);
//
// let HomeContainer = (withUrlDataContComponent);

export default compose(
    connect(mapStateToProps, {
        addNewPost,
        setUserProfile,
        getProfileThunkCreator,
        getUserStatusThunkCreator,
        UpdateStatusThunkCreator,
        savePhotoThunkCreator,
        sendInfoThunkCreator
    }),
    withRouter,
)(HomeApiContainer);