import React from "react";
import './store/reducers/homeReducer'
import 'antd/dist/antd.css';
import "./index.css"
import {Link, Route, withRouter} from "react-router-dom";
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initThunkCreator} from "./store/reducers/appReducer";
import Loader from "./common/Loader/Loader";
import {Redirect, Switch} from "react-router";
import {Breadcrumb, Layout, Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import logo from './assets/imgs/header/bonsai.svg'
const DialogContainer = React.lazy(() => import('./containers/dialogs/DialogContainer'))
const FriendsContainer = React.lazy(() => import('./containers/Friends/FriendsContainer'))
const HomeContainer = React.lazy(() => import('./containers/home/HomeContainer'))
const FeedContainer = React.lazy(() => import('./containers/feed/FeedContainer'))
const ChatPage = React.lazy(() => import('./pages/ChatPage'))

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class App extends React.Component {
    render() {
        if (!this.props.init) {

            return(
                <div className='appLoader'>
                    <Loader/>
                </div>
            )

        }
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>

                     <Link to='/profile/12177'><img src={logo} style={{width: "50px", height: "50px"}} alt=""/></Link>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            // defaultSelectedKeys={['1']}
                            // defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Profile">
                                <Menu.Item key="2"><Link to='/profile/12177'>Home</Link></Menu.Item>
                                <Menu.Item key="2"><Link to='/feed'>Feed</Link></Menu.Item>
                                <Menu.Item key="2"><Link to='/games'>Games</Link></Menu.Item>
                                <Menu.Item key="2"><Link to='/music'>Music</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Messages">
                                <Menu.Item key="2"><Link to='/chat'>Chat</Link></Menu.Item>
                            </SubMenu>

                            <SubMenu key="sub1" icon={<UserOutlined/>} title="Friends">
                                <Menu.Item key="1"> <Link to='/friends'>Friends</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item><Link to='/profile/12177'>Home</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <React.Suspense fallback={<Loader/>}>
                                <Switch>
                                    <Route exact path={"/soc-net-proj"}
                                           render={() => <Redirect to="/profile/12177"/>}/>
                                    <Route path='/profile/:userId?'
                                           render={() => < HomeContainer title={'TypeScript'}/>}/>
                                    <Route path='/chat' render={() => < ChatPage/>}/>
                                    <Route path='/login' render={() => <Login/>}/>
                                    <Route path='/friends' render={() => < FriendsContainer/>}/>
                                    <Route path='/feed' render={() => < FeedContainer/>}/>
                                    <Route path="*" render={() => <div>
                                        404 Not Found
                                    </div>}/>
                                </Switch>
                            </React.Suspense>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            // <div className="layout">
            //     <HeaderContainer/>
            //     <Navbar/>
            //
            //
            //
            // </div>

        );
    }
}

let mapStateToProps = (state) => {
    return {
        init: state.app.initialized
    };
}
export default compose(
    withRouter,
    connect(mapStateToProps, {
        initThunkCreator
    })
)(App)
