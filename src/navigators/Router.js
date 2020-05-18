import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import AcceptPrivacyPolicyScreenConnector from '../screens/AcceptPrivacyPolicyScreen';
import LoginScreen from '../screens/LoginScreen';
// import NotificationsScreenConnector from '../screens/NotificationsScreen';
// import OnboardingScreen from '../screens/OnboardingScreen';
// import ConfirmPinScreen from '../screens/ConfirmPinScreen';
// import CreatePinScreen from '../screens/CreatePinScreen';
// import EnterPinScreen from '../screens/EnterPinScreen';
// import MembershipCardScreen from '../screens/MembershipCardScreen';

import {
//   CONFIRM_PIN_ROUTE_KEY,
//   CREATE_PIN_ROUTE_KEY,
//   ENTER_PIN_ROUTE_KEY,
  LOGIN_ROUTE_KEY,
//   NOTIFICATION_PERMISSIONS_ROUTE_KEY,
//   ACCEPT_PRIVACY_POLICY_ROUTE_KEY,
//   TAB_NAVIGATOR_ROUTE_KEY,
//   ONBOARDING_ROUTE_KEY,
//   MEMBERSHIP_CARD_ROUTE_KEY,
} from './routeKeys';
// import MainTabNavigator from './MainTabNavigator';

const navigationOptions = () => ({
  gestureEnabled: false,
});

const loginStack = createStackNavigator(
  {
    [LOGIN_ROUTE_KEY]: {
      screen: LoginScreen,
      navigationOptions,
    },
    // [MEMBERSHIP_CARD_ROUTE_KEY]: {
    //   screen: MembershipCardScreen,
    //   navigationOptions,
    // },
    // [ACCEPT_PRIVACY_POLICY_ROUTE_KEY]: {
    //   screen: AcceptPrivacyPolicyScreenConnector,
    //   navigationOptions,
    // },
    // [CREATE_PIN_ROUTE_KEY]: {
    //   screen: CreatePinScreen,
    //   navigationOptions,
    // },
    // [CONFIRM_PIN_ROUTE_KEY]: {
    //   screen: ConfirmPinScreen,
    //   navigationOptions,
    // },
    // [ENTER_PIN_ROUTE_KEY]: {
    //   screen: EnterPinScreen,
    //   navigationOptions,
    // },
    // [ONBOARDING_ROUTE_KEY]: {
    //   screen: OnboardingScreen,
    //   navigationOptions,
    // },
    // [NOTIFICATION_PERMISSIONS_ROUTE_KEY]: {
    //   screen: NotificationsScreenConnector,
    //   navigationOptions,
    // },
    // [TAB_NAVIGATOR_ROUTE_KEY]: {
    //   screen: MainTabNavigator,
    //   navigationOptions,
    // },
  },
  {
    headerMode: 'none',
  },
);

const RootNavigator = createSwitchNavigator({
  loginStack,
});

export default createAppContainer(RootNavigator);
