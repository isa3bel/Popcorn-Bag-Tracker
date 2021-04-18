import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import LocationScreen from "./screens/LocationScreen";
import EditList from "./screens/EditList";
import Colors from "./constants/Colors";
import * as firebase from "firebase";
import Settings from "./screens/Settings";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};
const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Popcorn Bag Tracker" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={({ route }) => {
          return {
            title: route.params.title,
            headerStyle: { backgroundColor: route.params.color },
            headerTintColor: "white",
          };
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditList}
        options={({ route }) => {
          return {
            title: route.params.title
              ? `Edit ${route.params.title}`
              : "Create new list",
            headerStyle: {
              backgroundColor: route.params.color || Colors.blue,
            },
            headerTintColor: "white",
          };
        }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (firebase.auth().currentUser) {
      setIsAuthenticated(true);
    }
    firebase.auth().onAuthStateChanged((user) => {
      console.log("checking auth state...");
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      {isAuthenticated ? <Screens /> : <AuthScreens />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyA88APyQnnZjGtseTvIykhfSxKO8MPADk4",
  authDomain: "popcorn-bag-tracker-1d69b.firebaseapp.com",
  projectId: "popcorn-bag-tracker-1d69b",
  storageBucket: "popcorn-bag-tracker-1d69b.appspot.com",
  messagingSenderId: "726247444069",
  appId: "1:726247444069:web:6c7ca3aa7ecf9569ca408c",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
