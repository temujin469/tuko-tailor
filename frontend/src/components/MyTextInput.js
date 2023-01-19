import { StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const MyTextInput = ({
  label,
  value,
  onChange,
  style,
  multiline,
  onBlur,
  error,
  type,
  secure,
  onFocus,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      style={{ ...styles.input, ...style }}
      mode="outlined"
      multiline={multiline}
      error={error}
      secureTextEntry={secure}
      keyboardType={type}
      // activeOutlineColor="primary"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    // borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    minWidth: 145,
    marginBottom: 20,
  },
});

export default MyTextInput;
