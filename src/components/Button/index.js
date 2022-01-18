import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Texto } from "../Text";

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
    },
    text: {
        color: "#f5af26",
        fontSize: 16,
        lineHeight: 26,
        fontFamily: "RobotoRegular",
    },
});
