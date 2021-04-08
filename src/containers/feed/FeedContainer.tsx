import React from "react";
import {connect} from "react-redux";
import '../../generalFiles/general.css'
import style from '../../components/friends/styles/Friends.module.css'
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../store/store/redux-store";

type MapStateToProps = {
    friendPage: any
}

class FeedApiComponent extends React.Component {


    render() {

        return (
            <div className={style.friendLayout}>
                <h2>Feed</h2>
            </div>
        )
    }
};

const mapStateToProps = (state:AppStateType):MapStateToProps => {
    return {
        friendPage: state.friendPage,
    }
}
export default compose(
    connect(mapStateToProps, null),
    withAuthRedirect
)(FeedApiComponent);