import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Colors from "../constants/Colors";
import Checkbox from "./Checkbox";

export default ({ brand, date, isChecked, onChecked, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {/*<Checkbox isChecked={isChecked} onChecked={onChecked} />*/}
        <Text
          style={[
            styles.text,
            {
              color: isChecked ? Colors.lightGray : Colors.black,
              textDecorationLine: isChecked ? "line-through" : "none",
            },
          ]}
        >
          {brand}                            {date}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text style={(styles.icon, { color: Colors.red })}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    padding: 5,
    fontSize: 16,
  },
  text: {
    padding: 3,
    fontSize: 16,
  },
});
