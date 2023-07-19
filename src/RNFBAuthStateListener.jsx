import { createElement, useState, useEffect } from "react";
import { View, Text } from "react-native";
import auth from "@react-native-firebase/auth";
// import { useState } from "react-native";

// import { HelloWorld } from "./components/HelloWorld";

export function RNFBAuthStateListener({ yourName, style }) {
    // return <HelloWorld name={yourName} style={style} />;
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(newUser) {
        setUser(newUser);
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe
    });

    if (initializing) {
        return null;
    }

    if (!user) {
        return (
            <View>
                <Text>Login</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>Hello {user.email} </Text>
        </View>
    );
}
