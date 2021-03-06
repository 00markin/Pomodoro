import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Texto from "../Texto";

const screen = Dimensions.get("window");

export default function Button({ children, onPress, style }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Texto style={styles.textoBotao}>{children}</Texto>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#50285b",
        borderWidth: 5,
        borderColor: "#f5af26",
        width: screen.width /4,
        height: screen.width / 4,
        borderRadius: screen.width / 2,
        alignItems: "center",
        justifyContent: "center",
    },
    textoBotao: {
        color: "#f5af26",
        fontSize: 16,
        lineHeight: 26,
        fontWeight: 'bold',
    }
});
