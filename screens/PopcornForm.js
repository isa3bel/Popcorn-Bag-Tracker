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

export default function PopcornForm({ addBagToLists }) {
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
            <View>
              <View>
                <Text style={styles.text}>Brand Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Orville Redenbacher"
                  onChangeText={props.handleChange("brand")}
                  value={props.values.brand}
                />
              </View>
              <View>
                <Text style={styles.text}>Bag Count:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Number of bags"
                  onChangeText={props.handleChange("bagCount")}
                  value={props.values.bagCount}
                  defaultValue="3"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <TouchableOpacity
              style={{
                marginRight: 40,
                marginLeft: 40,
                marginTop: 10,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: "orange",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#fff",
              }}
              underlayColor="#fff"
              onPress={props.handleSubmit}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                Add Bags
              </Text>
            </TouchableOpacity>
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
    minWidth: 300,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  text: { marginTop: 20 },
});
