import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from './Colors';

const styles = StyleSheet.create({
    container: {
        paddingLeft: 24,
        paddingRight: 24,
        flex: 1,
        backgroundColor: Colors.white,
    },
});

const ScreenContainer = (props) => {
    return <View testID="container" {...props} style={[styles.container, props.style]}>{props.children}</View>;
};

export default ScreenContainer;
