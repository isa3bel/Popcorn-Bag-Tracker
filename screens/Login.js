import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/routers";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import validator from "validator";
import firebase, { auth } from "firebase";
import "@firebase/firestore";

const validateFields = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  };

  return isValid;
};
const login = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Logged in!");
    });
};
const createAccount = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)  
    .then(({ user }) => {
      // console.log("creating user...");
      firebase.firestore().collection("users").doc(user.uid).set({});
    });
};
export default () => {
  const [isCreateMode, setCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setpasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setpasswordReentryField] = useState({
    text: "",
    errorMessage: "",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍿 Tracker</Text>
      <View style={{ flex: 1 }}>
        <LabeledInput
          label="Email"
          text={emailField.text}
          onChangeText={(text) => {
            setEmailField({ text });
          }}
          errorMessage={emailField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="email"
        />
        <LabeledInput
          label="Password"
          text={passwordField.text}
          onChangeText={(text) => {
            setpasswordField({ text });
          }}
          secureTextEntry={true}
          errorMessage={passwordField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="password"
        />
        {isCreateMode && (
          <LabeledInput
            label="Re-Enter Password"
            text={passwordReentryField.text}
            onChangeText={(text) => {
              setpasswordReentryField({ text });
            }}
            secureTextEntry={true}
            errorMessage={passwordReentryField.errorMessage}
            labelStyle={styles.label}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setCreateMode(!isCreateMode);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: Colors.blue,
              fontSize: 16,
              margin: 4,
            }}
          >
            {isCreateMode ? "Already have an account?" : "Create new account"}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => {
          const isValid = validateFields(emailField.text, passwordField.text);
          let isAllValid = true;
          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valid email";
            setEmailField({ ...emailField });
            isAllValid = false;
          }

          if (!isValid.password) {
            passwordField.errorMessage =
              "Password must be at least 8 long, w/numbers, uppercase, lowercase, and symbols";
            setpasswordField({ ...passwordField });
            isAllValid = false;
          }

          if (isCreateMode && passwordReentryField.text != passwordField.text) {
            passwordReentryField.errorMessage = "Passwords to not match";
            setpasswordReentryField({ ...passwordReentryField });
            isAllValid = false;
          }

          if (isAllValid) {
            isCreateMode
              ? createAccount(emailField.text, passwordField.text)
              : login(emailField.text, passwordField.text);
          }
        }}
        buttonStyle={{ backgroundColor: Colors.red }}
        text={isCreateMode ? "Create Account" : "Login"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  label: { fontSize: 16, fontWeight: "bold", color: Colors.black },
  header: {
    fontSize: 40,
    color: Colors.red,
    alignSelf: "center",
    marginBottom: 40,
  },
});
