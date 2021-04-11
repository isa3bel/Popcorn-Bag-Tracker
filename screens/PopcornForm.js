import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";

export default function PopcornForm({addBagToLists}) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ brand: "", date: "", bagCount: 3 }}
        onSubmit={(values) => {
          addBagToLists(values);
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Brand"
              onChangeText={props.handleChange("brand")}
              value={props.values.brand}
            />

            <TextInput
              style={styles.input}
              placeholder="date"
              onChangeText={props.handleChange("date")}
              value={props.values.date}
            />

            <TextInput
              style={styles.input}
              placeholder="Number of bags"
              onChangeText={props.handleChange("bagCount")}
              value={props.values.bagCount}
              keyboardType='numeric'
            />

            <Button
              title="Submit"
              color="maroon"
              borderColor="black"
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  container: {
    flex: 1,
  }
});
