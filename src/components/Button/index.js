import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Texto } from "../Text";

const screen = Dimensions.get("window");

export default function Button({ children, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Texto style={styles.text}>{children}</Texto>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#50285b",
        borderWidth: 5,
        borderColor: "#f5af26",
        width: screen.width /2,
        height: screen.height / 2,
        borderRadius: screen.width / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#f5af26",
        fontSize: 16,
        lineHeight: 26,
        fontFamily: "RobotoRegular",
    },
});
