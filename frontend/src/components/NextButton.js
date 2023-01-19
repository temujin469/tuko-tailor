import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@rneui/themed";

const NextButton = ({ onPress }) => {
  return (
    <Button
      radius={"sm"}
      color="primary"
      onPress={onPress}
      buttonStyle={{ height: 50, marginBottom: 15 }}
    >
      Дараах
      <AntDesign
        name="arrowright"
        size={24}
        color="#fff"
        style={{ marginLeft: 7 }}
      />
    </Button>
  );
};

export default NextButton;
