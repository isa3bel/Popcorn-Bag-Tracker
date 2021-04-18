import React, { useState, useLayoutEffect, useEffect } from "react";
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
import PopcornForm from "./PopcornForm";
import BagItem from "../components/BagItem";
import {
  onSnapshot,
  addDoc,
  removeDoc,
  updateDoc,
} from "../services/collections";
import firebase, { auth } from "firebase";
import "@firebase/firestore";

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

export default ({ navigation, route }) => {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return month + "-" + date + "-" + year; //format: dd-mm-yyyy;
  };

  const [modalOpen, setModalOpen] = useState(false);

  let [popcornBags, setPopcornBags] = useState([
    //{ brand: "Orville", date: "", isChecked: false },
  ]);
  const [newItem, setNewItem] = useState();

  const popcornBagItemRef = firebase
    .firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("lists")
    .doc(route.params.listId)
    .collection("bag");

  useEffect(() => {
    onSnapshot(
      popcornBagItemRef,
      (newBag) => {
        setPopcornBags(newBag);
      },
      {
        sort: (a, b) => {
          if (a.isChecked && !b.isChecked) {
            return 1;
          }
          if (b.isChecked && !a.isChecked) {
            return -1;
          }

          return 0;
        },
      }
    );
  }, []);

  const addBagToLists = (item) => {
    // for (let i = 0; i < item.bagCount; i++) {
    //   const newItem = {
    //     brand: item.brand,
    //     date: getCurrentDate(),
    //     isChecked: false,
    //   };

    //   popcornBags.push(newItem);
    // }
    // setPopcornBags([...popcornBags]);
    //setModalOpen(false);

    for (let i = 0; i < item.bagCount; i++) {
      let newItem = {
        brand: item.brand,
        date: getCurrentDate(),
        isChecked: false,
      };
      
      addDoc(popcornBagItemRef, newItem);
      popcornBags = [newItem, ...popcornBags]
    }
    setModalOpen(false);
  };

  const removeItemFromLists = (index) => {
    popcornBags.splice(index, 1);
    setPopcornBags([...popcornBags]);
  };

  const updateItem = (index, item) => {
    popcornBags[index] = item;
    setPopcornBags([...popcornBags]);
  };

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
            <Text
              style={{
                backgroundColor: "gray",
                color: "white",
                padding: 5,
                fontSize: 20,
              }}
            >
              X
            </Text>
          </TouchableOpacity>
          <PopcornForm addBagToLists={addBagToLists} />
        </View>
      </Modal>
      <FlatList
        data={popcornBags}
        renderItem={({ item: { id, brand, date, isChecked }, index }) => {
          return (
            <BagItem
              brand={brand}
              isChecked={isChecked}
              date={date}
              // onChecked={() => {
              //   let item = popcornBags[index];
              //   item.isChecked = !isChecked;
              //   updateItem(index, item);
              // }}
              onDelete={() => {
                removeItemFromLists(index);
                id && removeDoc(popcornBagItemRef, id);
              }}
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
    alignItems: "flex-end",
    padding: 50,
  },
});
