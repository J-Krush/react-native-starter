import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppState, BackHandler, Platform, Text, View} from 'react-native';
// import firebase from 'react-native-firebase';
import {NavigationActions} from 'react-navigation';
import moment from 'moment';
// import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import Router from './navigators/Router';
import Http from './network/Http';
import {
  ACCEPT_PRIVACY_POLICY_ROUTE_KEY,
  CREATE_PIN_ROUTE_KEY,
  LOGIN_ROUTE_KEY,
  NOTIFICATION_PERMISSIONS_ROUTE_KEY,
  ONBOARDING_ROUTE_KEY,
  PORTION_LIST_ROUTE_KEY,
  ROOT_ROUTE_KEY,
  TAB_NAVIGATOR_ROUTE_KEY,
} from './navigators/routeKeys';
import {CONSTANTS} from './config/Constants';
import {determineNextLoginStackRoute} from './helpers/navigation';
// import {
//   ErrorBanner,
//   SuccessBanner,
//   WarningBanner,
// } from './components/common/AlertBanner';
// import {
//   resetAllErrors,
//   resetAllSuccesses,
//   resetAllWarnings,
// } from './redux/globalActions';

class AppView extends PureComponent {
  constructor(props) {
    super(props);

    this.navigator = null;

    this.state = {
      appState: 'active',
      lastActiveAt: null,
      codePushVersion: null,
      version: null,
      build: null,
      currentScreen: LOGIN_ROUTE_KEY,
    };
  }

  componentDidMount() {
    // firebase.analytics().setCurrentScreen(LOGIN_ROUTE_KEY);

    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);

    // codePush.getUpdateMetadata(codePush.UpdateState.RUNNING).then(metadata => {
    //   if (metadata) {
    //     this.setState({codePushVersion: metadata.label});
    //   }
    // });

    // DeviceInfo.getVersion().then(version => {
    //   this.setState({version});
    // });
    // DeviceInfo.getBuildNumber().then(build => {
    //   this.setState({build});
    // });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this._handleBackButton,
    );
  }

  _handleBackButton = () => {
    switch (this.state.currentScreen) {
      // case ACCEPT_PRIVACY_POLICY_ROUTE_KEY:
      // case CREATE_PIN_ROUTE_KEY:
      // case ONBOARDING_ROUTE_KEY:
      // case NOTIFICATION_PERMISSIONS_ROUTE_KEY:
      // case TAB_NAVIGATOR_ROUTE_KEY:
      // case PORTION_LIST_ROUTE_KEY:
      //   return true;
      // case LOGIN_ROUTE_KEY:
      //   BackHandler.exitApp();
      //   return false;
      default:
        return false;
    }
  };

  _navigate = () => {
    // ensure user is logged in before sending to preferred login type
    return (
      this.navigator &&
      this.navigator.dispatch(
        NavigationActions.navigate({
          routeName: determineNextLoginStackRoute(ROOT_ROUTE_KEY, {
            authenticationType: this.props.authenticationType,
          }),
        }),
      )
    );
  };

  _handleAppInBackground = nextAppState => {
    if (
      this.state.appState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      this.setState({
        lastActiveAt: moment().toISOString(),
      });
    }
  };

  _handleAppInForeground = nextAppState => {
    const {appState, lastActiveAt} = this.state;
    const {VALUE, UNITS} = CONSTANTS.APPLICATION.BACKGROUND_TIMEOUT;
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      if (
        moment(lastActiveAt).isBefore(moment().subtract(VALUE, UNITS), UNITS)
      ) {
        // force user to authenticate by preferred method
        this._navigate();
      }
    }
  };

  _handleAppStateChange = nextAppState => {
    this._handleAppInBackground(nextAppState);
    this._handleAppInForeground(nextAppState);
    this.setState({appState: nextAppState});
  };

  // gets the current screen from navigation state
  _getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this._getActiveRouteName(route);
    }
    return route.routeName;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Router
          ref={nav => {
            this.navigator = nav;
            Http.navigator = nav;
          }}
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = this._getActiveRouteName(currentState);
            const prevScreen = this._getActiveRouteName(prevState);

            if (prevScreen !== currentScreen) {
              // firebase.analytics().setCurrentScreen(currentScreen);
              this.setState({currentScreen});
            }
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.05)',
            }}>
            {`v${this.state.version}b${this.state.build}-${
              Platform.OS === 'ios' ? 'testflight' : 'internal'
            }${this.state.codePushVersion || 'v0'}`}
          </Text>
        </View>
        {/*{this.props.successes.length > 0 && (*/}
        {/*  <SuccessBanner*/}
        {/*    messages={this.props.successes}*/}
        {/*    dispatchAction={this.props.resetAllSuccesses}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{this.props.warnings.length > 0 && (*/}
        {/*  <WarningBanner*/}
        {/*    messages={this.props.warnings}*/}
        {/*    dispatchAction={this.props.resetAllWarnings}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{this.props.errors.length > 0 && (*/}
        {/*  <ErrorBanner*/}
        {/*    messages={this.props.errors}*/}
        {/*    dispatchAction={this.props.resetAllErrors}*/}
        {/*  />*/}
        {/*)}*/}
      </View>
    );
  }
}

// function mapStateToProps(state) {
//
// }

AppView.propTypes = {
};

AppView.defaultProps = {
};

// export default connect(
//   mapStateToProps,
//   {
//   },
// )(AppView);

export default AppView;
