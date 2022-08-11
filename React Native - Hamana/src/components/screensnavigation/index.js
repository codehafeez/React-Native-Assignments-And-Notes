import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from '../../screens/MainScreen/index';
import Login from '../../screens/Login/index';
import Signup from '../../screens/Signup/index';
import ForgotPassword from '../../screens/ForgotPassword/index';
import Home from '../../screens/Home/index';
import Users from '../../screens/Users/index';
import UserView from '../../screens/UserView/index';
import UserAdd from '../../screens/UserAdd/index';
import FAQ from '../../screens/FAQ/index';
import Support from '../../screens/Support/index';
import Settings from '../../screens/Settings/index';
import InviteFriends from '../../screens/InviteFriends/index';
import Profile from '../../screens/Profile/index';


const MainNav = createStackNavigator({
    MainScreen,
    Login,
    Signup,
    ForgotPassword,
},{ defaultNavigationOptions: { header: null }});  



const HomeNav = createStackNavigator({
    Home,
    Users,
    FAQ,
    Support,
    Settings,
    InviteFriends,
    Profile,
},{ defaultNavigationOptions: { header: null }});  


const UsersNav = createStackNavigator({
    Users,
    UserView,
    UserAdd,
},{ defaultNavigationOptions: { header: null }});  



const AppNav = createSwitchNavigator({
    App: MainNav,
    Home: HomeNav,
    UsersNav
});  
    
export default createAppContainer(AppNav);
