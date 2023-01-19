import { View, Text } from "react-native";
import React, { useState } from "react";
import { Dialog, Paragraph, Portal, RadioButton } from "react-native-paper";
import { Button } from "@rneui/themed";
import statusOfRole from "../utils/statusOfRole";
import getStatusValue from "../utils/getStatusValue";

const Status = ({
  role,
  disabled,
  onSubmit,
  oldStatus,
  newStatus,
  setNewStatus,
}) => {
  const [visibleDailog, setVisibleDailog] = useState(false);
  // EHELSEN || DUUSSAN

  const handleChange = (statusOption) => {
    setNewStatus(statusOption);
    setVisibleDailog(true);
  };

  const confirm = () => {
    onSubmit(newStatus);
    setVisibleDailog(false);
  };

  const cencel = () => {
    setVisibleDailog(false);
    setNewStatus(oldStatus);
  };

  return (
    <RadioButton.Group
      onValueChange={(statusOption) => handleChange(statusOption)}
      value={oldStatus}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton disabled={disabled} value="EHELSEN" />
          <Text>Эхэлсэн</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton disabled={disabled} value="DUUSSAN" />
          <Text>Дууссан</Text>
        </View>
      </View>
      {/* dailog */}
      <Portal>
        <Dialog
          visible={visibleDailog}
          onDismiss={cencel}
          style={{ backgroundColor: "#fff", borderRadius: 15 }}
        >
          <Dialog.Title>{statusOfRole(role)}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {`${getStatusValue(newStatus)} гэж тэмдэглэх`}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              type="clear"
              onPress={cencel}
              buttonStyle={{ marginRight: 15 }}
            >
              Үгүй
            </Button>
            <Button color={"primary"} onPress={confirm}>
              Тийм
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* dailog end */}
    </RadioButton.Group>
  );
};

export default Status;
