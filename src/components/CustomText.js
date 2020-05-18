import React from "react";
import { StyleSheet, Text } from 'react-native';
import {CONSTANTS} from "../config/Constants";
import Colors from "./Colors";

const styles = StyleSheet.create({
    text: {
        // fontFamily: CONSTANTS.FONT.REGULAR,
        color: Colors.textBlack,
        fontSize: 18,
    },
    link: {
        // fontFamily: CONSTANTS.FONT.SEMI_BOLD,
        color: Colors.textBlack,
        fontSize: 14,
    },
    paragraph: {
        // fontFamily: CONSTANTS.FONT.REGULAR,
        color: 'grey',
        fontSize: 18,
        lineHeight: 23,
    },
    chat: {
        fontSize: 16,
        // fontFamily: CONSTANTS.FONT.REGULAR,
    },
    subParagraph: {
        // fontFamily: CONSTANTS.FONT.REGULAR,
        color: 'grey',
        fontSize: 14,
        lineHeight: 18,
    },
    heading1: {
        // fontFamily: CONSTANTS.FONT.BOLD,
        color: Colors.textBlack,
        fontSize: 28,
    },
    heading2: {
        // fontFamily: CONSTANTS.FONT.REGULAR,
        color: Colors.textBlack,
        fontSize: 20,
    },
    heading3: {
        // fontFamily: CONSTANTS.FONT.REGULAR,
        color: Colors.grey,
        fontSize: 18,
        lineHeight: 23,
    },
    heading4: {
        // fontFamily: CONSTANTS.FONT.REGULAR,
        color: Colors.black,
        fontSize: 14,
        lineHeight: 23,
    },
    button: {
        // fontFamily: CONSTANTS.FONT.REGULAR,
        fontSize: 18,
        color: Colors.white,
    },
});

const CustomText = (props) => {
    return <Text {...props} style={[styles.text, props.style]} />;
};

export {
    CustomText,
};
