import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import ScreenContainer from "../components/ScreenContainer";
import {CustomText} from "../components/CustomText";

const styles = {
    containerStyle: {
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 0,
        paddingRight: 0,
    },
};

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    async componentDidMount() {
        // init db here since this is the index screen and mounts before the app regardless of async
        // await RealmDb.init();
    }

    render() {
        const {
            containerStyle,
            // keyboardScrollViewStyle,
            // logoStyle,
            // inputsStyle,
        } = styles;

        return (
            <ScreenContainer style={containerStyle}>
                <CustomText>
                    Hellooooo
                </CustomText>
            </ScreenContainer>
        );
    }

}

// const mapStateToProps = (state) => {
//     return null
// };

// export default connect(
//     mapStateToProps,
//     {
        // loginUser,
        // resetLogin,
//     },
// )(LoginScreen);

export default LoginScreen;

