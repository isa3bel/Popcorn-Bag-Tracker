import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { CommonActions } from "@react-navigation/routers";
import { auth } from "firebase";
import Button from "../components/Button";

export default () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Button
        text="Log out"
        onPress={() => {
          auth().signOut();
        }}
      />
    </View>
  );
};
