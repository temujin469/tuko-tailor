import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { CheckBox } from "@rneui/themed";

const RadioButtons = ({ setStatus, status, isMyOrder }) => {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);

  const handleOption = (option) => {
    if (option === "EHELSEN") {
      setOption1(true);
      setOption2(false);
      setStatus(option);
    } else if (option === "DUUSSAN") {
      setOption2(true);
      setOption1(false);
      setStatus(option);
    } else {
      setOption1(false);
      setOption2(false);
    }
  };

  // render ehelhed anhnii utgiig olgon
  useEffect(() => {
    handleOption(status);
  }, []);

  return (
    <View style={{ flexDirection: "row" }}>
      <CheckBox
        title="Эхэлсэн"
        type="clear"
        disabled={!isMyOrder}
        checked={option1}
        size={21}
        textStyle={{ fontWeight: "400", fontSize: 14 }}
        containerStyle={{
          padding: 0,
          backgroundColor: "transparent",
          margin: 0,
          width: 80,
        }}
        wrapperStyle={{ padding: 0, margin: 0 }}
        onPress={() => handleOption("EHELSEN")}
      />
      <CheckBox
        title="Дууссан"
        disabled={!isMyOrder}
        checked={option2}
        size={21}
        textStyle={{ fontWeight: "400", fontSize: 14 }}
        containerStyle={{
          padding: 0,
          backgroundColor: "transparent",
          margin: 0,
        }}
        onPress={() => handleOption("DUUSSAN")}
      />
    </View>
  );
};

export default RadioButtons;
