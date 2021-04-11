import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import PopcornForm from "./PopcornForm";
import BagItem from "../components/BagItem";

const renderAddBagIcon = (setModalOpen) => {
  return (
    // <TouchableOpacity
    //   onPress={() => addItem({ text: "Hello2", isChecked: false })}
    // >
    //   <Text style={styles.icon}>+</Text>
    // </TouchableOpacity>
    <TouchableOpacity onPress={() => setModalOpen(true)}>
      <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [popcornBags, setPopcornBags] = useState([
    { brand: "Orville", date: "today", isChecked: false },
  ]);

  const addBagToLists = (item) => {
    for (let i = 0; i < item.bagCount; i++) {
      const newItem = {brand: item.brand, date: item.date, isChecked: false};
      console.log(newItem)
      popcornBags.push(newItem);
    }
    setPopcornBags([...popcornBags]);
    setModalOpen(false);
  };

  const removeItemFromLists = (index) => {
    popcornBags.splice(index, 1);
    setPopcornBags([...popcornBags]);
  };

  const updateItem = (index, item) => {
    popcornBags[index] = item;
    setPopcornBags([...popcornBags]);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => renderAddBagIcon(setModalOpen),
    });
  });

  return (
    <View style={styles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setModalOpen(false)}>
            <Text style={{ fontSize: 14 }}>Close Modal</Text>
          </TouchableOpacity>
          <PopcornForm addBagToLists={addBagToLists} />
        </View>
      </Modal>
      <FlatList
        data={popcornBags}
        renderItem={({ item: { brand, date, isChecked }, index }) => {
          return (
            <BagItem
              brand={brand}
              isChecked={isChecked}
              date={date}
              onChecked={() => {
                const item = popcornBags[index];
                item.isChecked = !isChecked;
                updateItem(index, item)
              }}
              onDelete={() => removeItemFromLists(index)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  icon: {
    padding: 5,
    fontSize: 32,
    color: "white",
  },
  modalContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 50,
  },
});
