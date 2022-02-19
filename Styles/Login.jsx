import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    container: {
        paddingTop: 0,
    },
    upperBody: {
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#242850",
        height: "50%",
        borderBottomRightRadius: 280,
        borderBottomLeftRadius: 100,
    },
    lowerBody: {
        backgroundColor: "#1B1E3C",
        height: "100%",
    },
    loginImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    rememberPanel: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "85%",
    }
})

export const chatStyles = StyleSheet.create({
    list: {
        borderColor: '#ffff',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
    }
})