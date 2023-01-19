import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Dialog, Portal } from "react-native-paper";
import { Button, Icon, Slider, useTheme } from "@rneui/themed";

const OrderOnoo = ({ setNewOnoo, newOnoo, onSubmit, oldOnoo }) => {
  const [visibleDailog, setVisibleDailog] = useState(false);
  const { theme } = useTheme();

  const confirm = () => {
    onSubmit();
    setVisibleDailog(false);
  };

  const cencel = () => {
    setNewOnoo(oldOnoo);
    setVisibleDailog(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setVisibleDailog(true)}>
        <Text>{newOnoo}/оноо</Text>
      </TouchableOpacity>
      <Portal>
        <Dialog
          visible={visibleDailog}
          onDismiss={cencel}
          style={{ backgroundColor: "#fff", borderRadius: 15 }}
        >
          <Dialog.Title>Оноо:{newOnoo}</Dialog.Title>
          <Dialog.Content>
            <Slider
              value={newOnoo}
              onValueChange={(onoo) => setNewOnoo(onoo)}
              maximumValue={5}
              minimumValue={0}
              minimumTrackTintColor={theme.colors.primary}
              animationType="timing"
              step={1}
              allowTouchTrack
              trackStyle={{ height: 5, backgroundColor: "transparent" }}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: "transparent",
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="star"
                    type="font-awesome"
                    size={20}
                    reverse
                    containerStyle={{ bottom: 20, right: 20 }}
                    color={theme.colors.primary}
                  />
                ),
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              type="clear"
              onPress={cencel}
              buttonStyle={{ marginRight: 15 }}
            >
              Буцах
            </Button>
            <Button color={"primary"} onPress={confirm}>
              Хадгалах
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default OrderOnoo;
