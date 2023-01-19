import { View, Text } from "react-native";
import React, { useState } from "react";
import { Dialog, Paragraph, Portal, RadioButton } from "react-native-paper";
import { Button } from "@rneui/themed";

const OrderStatus = ({ onSubmit, oldOrderStatus }) => {
  const [visibleDailog, setVisibleDailog] = useState(false);

  //  DUUSSAN || UTASDSAN || IRJAWSAN
  const [newOrderStatus, setNewOrderStatus] = useState();

  const handleChange = (statusOption) => {
    setNewOrderStatus(statusOption);
    setVisibleDailog(true);
  };

  const confirm = () => {
    onSubmit(newOrderStatus);
    setVisibleDailog(false);
  };

  const cencel = () => {
    setVisibleDailog(false);
    setNewOrderStatus(oldOrderStatus);
  };

  return (
    <RadioButton.Group
      onValueChange={(statusOption) => handleChange(statusOption)}
      value={oldOrderStatus}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          height: 60,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="DUUSSAN" />
          <Text>Дууссан</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="UTASDSAN" />
          <Text>Утасдсан</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="IRJAWSAN" />
          <Text>Ирж авсан</Text>
        </View>
      </View>
      {/* dailog */}
      <Portal>
        <Dialog
          visible={visibleDailog}
          onDismiss={() => cencel()}
          style={{ backgroundColor: "#fff", borderRadius: 15 }}
        >
          <Dialog.Title>Захиалга</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {newOrderStatus === "DUUSSAN"
                ? "Дууссан"
                : newOrderStatus === "UTASDSAN"
                ? "Утасдсан"
                : newOrderStatus === "IRJAWSAN"
                ? "Ирж авсан"
                : null}{" "}
              гэж тэмдэглэх
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              type="clear"
              onPress={() => cencel()}
              buttonStyle={{ marginRight: 15 }}
            >
              Үгүй
            </Button>
            <Button color={"primary"} onPress={() => confirm()}>
              Тийм
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* dailog end */}
    </RadioButton.Group>
  );
};

export default OrderStatus;
