import {
  ROOT_ROUTE_KEY,
  LOGIN_ROUTE_KEY,
  ACCEPT_PRIVACY_POLICY_ROUTE_KEY,
  CREATE_PIN_ROUTE_KEY,
  CONFIRM_PIN_ROUTE_KEY,
  ENTER_PIN_ROUTE_KEY,
  TAB_NAVIGATOR_ROUTE_KEY,
  NOTIFICATION_PERMISSIONS_ROUTE_KEY,
  ONBOARDING_ROUTE_KEY,
} from '../navigators/routeKeys';
import {CONSTANTS} from '../config/Constants';

export function determineNextLoginStackRoute(routeName, options = {}) {
  const {
    authenticationType,
    isPrivacyAgreed,
    hasExistingAuthType,
    maxAttemptsReached,
    successfulBiometric,
    successfulLogin,
    successfulPinMatch,
    hasConfiguredPushNotifications,
    hasSeenOnboarding,
    isSkippingPin,
  } = options;
  const {
    BIOMETRIC,
    LOGIN,
    NONE,
    PIN,
  } = CONSTANTS.APPLICATION.AUTHENTICATION_METHOD_CHOSEN;
  let nextRoute;

  switch (routeName) {
    case ROOT_ROUTE_KEY:
      if (
        authenticationType === NONE ||
        authenticationType === LOGIN ||
        authenticationType === BIOMETRIC
      ) {
        nextRoute = LOGIN_ROUTE_KEY;
      }
      if (authenticationType === PIN) {
        nextRoute = ENTER_PIN_ROUTE_KEY;
      }
      return nextRoute;

    case LOGIN_ROUTE_KEY:
      if (isPrivacyAgreed) {
        if (successfulLogin) {
          if (authenticationType === NONE) {
            nextRoute = CREATE_PIN_ROUTE_KEY;
          } else if (maxAttemptsReached) {
            nextRoute = maxAttemptsReached
              ? CREATE_PIN_ROUTE_KEY
              : TAB_NAVIGATOR_ROUTE_KEY;
          } else if (!hasSeenOnboarding) {
            nextRoute = ONBOARDING_ROUTE_KEY;
          } else if (!hasConfiguredPushNotifications) {
            nextRoute = NOTIFICATION_PERMISSIONS_ROUTE_KEY;
          } else {
            nextRoute = TAB_NAVIGATOR_ROUTE_KEY;
          }
        } else if (authenticationType === PIN) {
          nextRoute = ENTER_PIN_ROUTE_KEY;
        }
      } else {
        nextRoute = ACCEPT_PRIVACY_POLICY_ROUTE_KEY;
      }
      return nextRoute;

    case ACCEPT_PRIVACY_POLICY_ROUTE_KEY:
      nextRoute = CREATE_PIN_ROUTE_KEY;

      if ((successfulBiometric || hasExistingAuthType) && !maxAttemptsReached) {
        if (!hasSeenOnboarding) {
          nextRoute = ONBOARDING_ROUTE_KEY;
        } else if (!hasConfiguredPushNotifications) {
          nextRoute = NOTIFICATION_PERMISSIONS_ROUTE_KEY;
        } else {
          nextRoute = TAB_NAVIGATOR_ROUTE_KEY;
        }
      }
      return nextRoute;

    case CREATE_PIN_ROUTE_KEY:
      nextRoute = CONFIRM_PIN_ROUTE_KEY;

      if (isSkippingPin) {
        if (!hasSeenOnboarding) {
          nextRoute = ONBOARDING_ROUTE_KEY;
        } else if (!hasConfiguredPushNotifications) {
          nextRoute = NOTIFICATION_PERMISSIONS_ROUTE_KEY;
        } else {
          nextRoute = TAB_NAVIGATOR_ROUTE_KEY;
        }
      }
      return nextRoute;

    case CONFIRM_PIN_ROUTE_KEY:
      nextRoute = CREATE_PIN_ROUTE_KEY;

      if (isSkippingPin) {
        if (!hasSeenOnboarding) {
          nextRoute = ONBOARDING_ROUTE_KEY;
        } else if (!hasConfiguredPushNotifications) {
          nextRoute = NOTIFICATION_PERMISSIONS_ROUTE_KEY;
        } else {
          nextRoute = TAB_NAVIGATOR_ROUTE_KEY;
        }
      }

      if (successfulPinMatch) {
        if (!hasSeenOnboarding) {
          nextRoute = ONBOARDING_ROUTE_KEY;
        } else if (!hasConfiguredPushNotifications) {
          nextRoute = NOTIFICATION_PERMISSIONS_ROUTE_KEY;
        } else {
          nextRoute = TAB_NAVIGATOR_ROUTE_KEY;
        }
      }
      return nextRoute;

    case ENTER_PIN_ROUTE_KEY:
      nextRoute = ENTER_PIN_ROUTE_KEY;
      if (successfulPinMatch) {
        if (!isPrivacyAgreed) {
          nextRoute = ACCEPT_PRIVACY_POLICY_ROUTE_KEY;
        } else if (!hasSeenOnboarding) {
          nextRoute = ONBOARDING_ROUTE_KEY;
        } else if (!hasConfiguredPushNotifications) {
          nextRoute = NOTIFICATION_PERMISSIONS_ROUTE_KEY;
        } else {
          nextRoute = TAB_NAVIGATOR_ROUTE_KEY;
        }
      }
      return nextRoute;

    default:
      return LOGIN_ROUTE_KEY;
  }
}
