import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, Divider } from "@rneui/themed";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../utils/axios";
import { Dialog, Portal, TextInput } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

const InfoList = ({ title, value, tvlhvvr, workerId }) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(value);
  const newInfo = {
    [tvlhvvr]:
      tvlhvvr === "phoneNumber" || tvlhvvr === "homePhoneNumber"
        ? Number(input)
        : input,
  };

  const { token, worker } = useSelector((state) => state.auth);

  const isMyInfo = worker._id === workerId;

  const queryClient = useQueryClient();

  const updateUserInfoMutation = useMutation(
    async () => {
      return await baseUrl.put(`/users/${worker._id}`, newInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        setErr("");
        queryClient.invalidateQueries(["currentWorker"]);
        queryClient.invalidateQueries("workers");
        queryClient.invalidateQueries("worker");
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
        setErr(err);
      },
    }
  );

  const handleCencel = () => {
    setOpen(false);
    setInput(value);
  };

  const handleUpdate = () => {
    setLoading(true);
    updateUserInfoMutation.mutate();
    setOpen(false);
    console.log(workerId);
  };

  return (
    <View>
      <Spinner visible={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Portal>
          <Dialog
            visible={open}
            onDismiss={handleCencel}
            style={{ backgroundColor: "#fff", borderRadius: 15 }}
          >
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Content>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                keyboardType={
                  tvlhvvr === "phoneNumber" || tvlhvvr === "homePhoneNumber"
                    ? "numeric"
                    : "default"
                }
                contentStyle={{ backgroundColor: "#fff" }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                type="clear"
                onPress={handleCencel}
                buttonStyle={{ marginRight: 15 }}
              >
                болих
              </Button>
              <Button color={"primary"} onPress={handleUpdate}>
                Шинэчлэх
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </KeyboardAvoidingView>

      <View style={styles.row}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Text style={styles.smallText}>{title}</Text>
          <Text style={{ color: "#222" }}>{value}</Text>
        </View>
        {isMyInfo && (
          <Button
            buttonStyle={{
              padding: 6,
              paddingHorizontal: 6,
              backgroundColor: "#DDDDDD",
            }}
            onPress={() => setOpen(true)}
          >
            <FontAwesome color="#363636" name="edit" size={18} />
          </Button>
        )}
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  smallText: {
    color: "gray",
    paddingBottom: 3,
    fontSize: 10,
  },
});
export default InfoList;
