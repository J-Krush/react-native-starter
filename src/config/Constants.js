export const CONSTANTS = {
  LOGS: {
    MOCK: 'MOCK',
    IS_SANDBOX: 'IS_SANDBOX',
  },
  ANALYTIC_USER_PROPERTIES: {
    FIRST_NAME: 'FIRST_NAME',
    LAST_NAME: 'LAST_NAME',
    AUTHENTICATION_METHOD_CHOSEN: 'AUTHENTICATION_METHOD_CHOSEN',
  },
  ANALYTIC_EVENTS: {
    PRESS_EDI_CARD_LOGIN_SCREEN: 'PRESS_EDI_CARD_LOGIN_SCREEN',
    PRESS_FORGOT_PASSWORD_LOGIN_SCREEN: 'PRESS_FORGOT_PASSWORD_LOGIN_SCREEN',
    PRESS_REGISTER_LOGIN_SCREEN: 'PRESS_REGISTER_LOGIN_SCREEN',
    PRESS_RESET_PIN_ENTER_PIN_SCREEN: 'PRESS_RESET_PIN_ENTER_PIN_SCREEN',
    DID_USER_ENABLE_PUSH_NOTIFICATIONS: 'DID_USER_ENABLE_PUSH_NOTIFICATIONS',
    USER_SENT_SHARE: 'USER_SENT_SHARE',
  },
  ERROR: {
    NETWORK: 1,
    DATABASE: 2,
    COMPONENT: 3,
    SAGA: 4,
  },
  USER_ENVIRONMENT: {
    MOCK: 'MOCK',
    SANDBOX: 'SANDBOX',
  },
  NETWORK: {
    STANDARD_TIMEOUT: 7,
    EXTENDED_TIMEOUT: 15,
    LINKS: {
      FORGOT_PASSWORD:
        'https://identity.given.samaritanministries.org/Passwords/ForgotPassword?returnUrl=/connect/authorize/callback?client_id=phoenix_member_app&redirect_uri=https%3A%2F%2Fgiven.samaritanministries.org%2Fauth_callback&response_type=id_token%20token&scope=api1%20openid%20profile%20memberships%20bills%20shares%20offline_access&state=c03ffb22f28841b2acf3edc5cd6366db&nonce=2ec83055d1b14d96847a6e2e58f184c6',
      SIGN_UP: 'https://samaritanministries.org/samaritangiven',
    },
  },
  APPLICATION: {
    GENERIC_ERROR: 'Something went wrong. Please try again later.',
    MAX_PIN_ENTRY_ATTEMPTS: 5,
    BANNER_TYPE: {
      ERROR: 'ERROR',
      WARNING: 'WARNING',
      SUCCESS: 'SUCCESS',
    },
    AUTHENTICATION_METHOD_CHOSEN: {
      NONE: 'NONE',
      LOGIN: 'LOGIN',
      PIN: 'PIN',
      BIOMETRIC: 'BIOMETRIC',
    },
    BACKGROUND_TIMEOUT: {
      VALUE: 15,
      UNITS: 'minutes',
    },
    MIN_SCREEN_HEIGHT_BREAK_POINT: 620,
    NOTIFICATIONS: {
      SHARES_CHANNEL: 'SHARES_CHANNEL',
      BILLS_CHANNEL: 'BILLS_CHANNEL',
      SEND_NOTE_REMINDER_CHANNEL: 'SEND_NOTE_REMINDER_CHANNEL',
    },
  },
  FONT: {
    REGULAR: 'EffraApp-Regular',
    SEMI_BOLD: 'EffraApp-Medium',
    BOLD: 'EffraApp-Bold',
  },
};

const IS_PROFILE_BIO_EDITABLE = false;
const IS_PROFILE_IMAGE_EDITABLE = false;
const IS_PROFILE_PRAYER_REQ_EDITABLE = true;

export const FEATURES_ENABLED = {
  IS_PROFILE_BIO_EDITABLE,
  IS_PROFILE_IMAGE_EDITABLE,
  IS_PROFILE_PRAYER_REQ_EDITABLE,
  IS_PROFILE_VISIBLE: true,
  IS_WALLET_LINK_VISIBLE: false,
  IS_PROFILE_EDITABLE:
    IS_PROFILE_BIO_EDITABLE ||
    IS_PROFILE_IMAGE_EDITABLE ||
    IS_PROFILE_PRAYER_REQ_EDITABLE,
};

export const NAVIGABLE = {
  HOME_TAB: false,
  SHARING_TAB: true,
  BILLS_TAB: false,
  PROFILE_TAB: true,
  PROFILE_SECTION: {
    VIEW_PROFILE: true,
    MEMBERSHIP_CARD_ROW: true,
    WALLET_ROW: false,
    ACCOUNT_INFORMATION_ROW: false,
    SETTINGS_ROW: true,
    GET_HELP_ROW: false,
    GIVE_US_FEEDBACK_ROW: true,
    SETTINGS_SECTION: {
      EDIT_PROFILE: true,
      NOTIFICATIONS: true,
      PRIVACY_POLICY: true,
      SECURITY: true,
    },
  },
};

// Generated from Google maps by our designer John Clark
export const MapStyle = [
  {
    elementType: 'geometry',
    stylers: [{color: '#f5f5f5'}],
  },
  {
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{color: '#616161'}],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{color: '#f5f5f5'}],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{color: '#434343'}],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'administrative.locality',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'geometry',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{color: '#434343'}],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels',
    stylers: [{color: '#434343'}, {visibility: 'off'}],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels.text',
    stylers: [{color: '#434343'}, {visibility: 'simplified'}],
  },
  {
    featureType: 'landscape',
    stylers: [{color: '#ffffff'}],
  },
  {
    featureType: 'poi',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#eeeeee'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#757575'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#e5e5e5'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9e9e9e'}],
  },
  {
    featureType: 'road',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#ffffff'}],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{color: '#757575'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#dadada'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#616161'}],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9e9e9e'}],
  },
  {
    featureType: 'transit',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{color: '#e5e5e5'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{color: '#eeeeee'}],
  },
  {
    featureType: 'water',
    stylers: [{color: '#ebebeb'}],
  },
];
