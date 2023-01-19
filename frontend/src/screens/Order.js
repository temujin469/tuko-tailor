import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import moment from "moment";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getOrderById } from "../api/order";
import Spinner from "react-native-loading-spinner-overlay";
import { BottomSheet, Button, Icon, Image, ListItem } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";
import { Appbar, Dialog, Paragraph, Portal } from "react-native-paper";
import { baseUrl } from "../utils/axios";

const MyView = ({ title, val }) => {
  return (
    <View style={styles.boxWrapper}>
      <Text style={styles.boxText}>{title}</Text>
      <Text style={styles.boxTextVal}>{val ? val : "-"}</Text>
    </View>
  );
};

const Order = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [visibleDailog, setVisibleDailog] = useState(false);
  const [visibleBottomSheet, setVisibleBottomSheet] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { orderId } = route.params;

  const { token } = useSelector((state) => state.auth);

  const {
    error,
    isLoading,
    data: order,
  } = useQuery(["order", orderId], () => getOrderById({ id: orderId, token }));

  const queryClient = useQueryClient();

  const deleteOrderMutation = useMutation(
    async () => {
      return await baseUrl.delete(`/orders/${order._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
        setDeleteLoading(false);
        navigation.pop();
      },

      onError: (err) => {
        Alert.alert("Алдаа гарлаа", err);
        setDeleteLoading(false);
      },
    }
  );

  const confirm = () => {
    setDeleteLoading(true);
    setVisibleDailog(false);
    deleteOrderMutation.mutate();
  };

  return (
    <>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Захиалга харах хуудас" />
        <Appbar.Action
          icon={"dots-vertical"}
          onPress={() => setVisibleBottomSheet(true)}
        />
      </Appbar.Header>
      <ScrollView>
        {isLoading ? (
          <Spinner visible />
        ) : error ? (
          <Text>{JSON.stringify(error)}</Text>
        ) : (
          <View style={{ marginTop: 20 }}>
            <View style={styles.row}>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Нэр</Text>
                <Text style={styles.wrapperText}>{order.name}</Text>
              </View>
              <View style={{ marginHorizontal: 10 }} />
              <View style={styles.wrapper}>
                <Text style={styles.label}>Утас</Text>
                <Text style={styles.wrapperText}>{order.phoneNumber}</Text>
              </View>
            </View>
            <View style={{ ...styles.row, marginBottom: 20 }}>
              <View style={{ ...styles.wrapper }}>
                <Text style={styles.label}>Өгсөн огноо</Text>
                <Text style={styles.wrapperText}>
                  {moment(order.startDate).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View style={{ marginHorizontal: 10 }} />

              <View style={{ ...styles.wrapper }}>
                <Text style={styles.label}>Примерка</Text>
                <Text style={styles.wrapperText}>
                  {moment(order.startDate).format("DD/MM/YYYY")}
                </Text>
              </View>
              <View style={{ marginHorizontal: 10 }} />

              <View style={{ ...styles.wrapper }}>
                <Text style={styles.label}>Авах огноо</Text>
                <Text style={styles.wrapperText}>
                  {moment(order.takeDate).format("DD/MM/YYYY")}
                </Text>
              </View>
            </View>
            {order.images && (
              <View style={{ marginBottom: 20, flex: 1 }}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <Image
                    source={{ uri: order.images[0] }}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </TouchableOpacity>

                <ImageView
                  images={order.images?.map((image) => {
                    return { uri: image };
                  })}
                  style={{ flex: 1 }}
                  imageIndex={0}
                  visible={visible}
                  onRequestClose={() => setVisible(false)}
                />
              </View>
            )}

            <View style={{ marginBottom: 40, paddingHorizontal: 10 }}>
              <Text
                style={{
                  ...styles.label,
                  flex: 1,
                  // textAlign: "right",
                  marginBottom: 10,
                }}
              >
                Биеийн хэмжээ
              </Text>
              <View>
                <MyView title="Биеийн жин" val={order.bodyInfo.jin} />
                <MyView
                  title="цээжний тойрог"
                  val={order.bodyInfo.tseejniiToirog}
                />
                <MyView title="бүсэлхийн тойрог" val={order.bodyInfo.jin} />
                <MyView
                  title="өгзөгний тойрог"
                  val={order.bodyInfo.ugzugniiToirog}
                />
                <MyView
                  title="энгэрийн өргөн"
                  val={order.bodyInfo.engeriinUrgun}
                />
                <MyView
                  title="энгэрийн өндөр"
                  val={order.bodyInfo.engeriinUndur}
                />
                <MyView title="арын өргөн " val={order.bodyInfo.ariinUrgun} />
                <MyView title="арын өндөр" val={order.bodyInfo.ariinUndur} />
                <MyView title="хөхний өндөр" val={order.bodyInfo.huhniiUndur} />
                <MyView
                  title="хөх хоорондын зай"
                  val={order.bodyInfo.huhHoorondiinZai}
                />
                <MyView title="мөрний өргөн" val={order.bodyInfo.murniiUrgun} />
                <MyView
                  title="мөр хоорондын зай"
                  val={order.bodyInfo.murHoorondiinZai}
                />
                <MyView title="ханцуйн урт" val={order.bodyInfo.hantsuinUrt} />
                <MyView
                  title="буглагны тойрог"
                  val={order.bodyInfo.buglagniiToirog}
                />
                <MyView
                  title="бугуйн тойрог"
                  val={order.bodyInfo.buguinToirog}
                />
                <MyView
                  title="хүзүүний тойрог"
                  val={order.bodyInfo.huzuuniiToirog}
                />
                <MyView title="захны өндөр" val={order.bodyInfo.zahniiUndur} />
                <MyView title="эдлэлийн урт" val={order.bodyInfo.edleliinUrt} />
              </View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              {/* <Text
            style={{
              ...styles.label,
              flex: 1,
              // textAlign: "right",
              marginBottom: 10,
            }}
          >
            Тайлбар
          </Text> */}
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Үндсэн материал</Text>
                  <Text style={styles.wrapperText}>
                    {order.otherInfo.undsenMaterial}
                  </Text>
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Эмжээр</Text>
                  <Text style={styles.wrapperText}>
                    {order.otherInfo.emjeer}
                  </Text>
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Хавчаар</Text>
                  <Text style={styles.wrapperText}>
                    {order.otherInfo.hawchaar}
                  </Text>
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Товч шилбэ</Text>
                  <Text style={styles.wrapperText}>
                    {order.otherInfo.towchShilbe}
                  </Text>
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Бүс</Text>
                  <Text style={styles.wrapperText}>{order.otherInfo.bus}</Text>
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Хатгамал</Text>
                  <Text style={styles.wrapperText}>
                    {order.otherInfo.hatgamal}
                  </Text>
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Чимэглэл</Text>
                  <Text style={styles.wrapperText}>
                    {order.otherInfo.chimeglel}
                  </Text>
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Бусад</Text>
                  <Text style={styles.wrapperText}>
                    {order.otherInfo.busad}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <BottomSheet isVisible={visibleBottomSheet}>
        <ListItem
          onPress={() => {
            setVisibleBottomSheet(false);
            setVisibleDailog(true);
          }}
        >
          <Icon
            name="trash-can-outline"
            type="material-community"
            color="grey"
          />
          <ListItem.Content>
            <ListItem.Title>Устгах</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem onPress={() => setVisibleBottomSheet(false)}>
          <Ionicons name="arrow-back-outline" size={24} color="gray" />
          <ListItem.Content>
            <ListItem.Title>Хаах</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
      {/* dailog start */}
      <Portal>
        <Dialog
          visible={visibleDailog}
          onDismiss={() => setVisibleDailog(false)}
          style={{ backgroundColor: "#fff", borderRadius: 15 }}
        >
          <Dialog.Title>{order?.name}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Та энэ захиалгыг устгахдаа итгэлтэй байна уу?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              type="clear"
              onPress={() => setVisibleDailog(false)}
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
      <Spinner visible={deleteLoading} />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  wrapperText: {
    backgroundColor: "#e3e3e3",
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
    color: "#333333",
    paddingVertical: 7,
  },
  wrapper: {
    flex: 1,
    marginBottom: 15,
  },
  label: {
    color: "#808080",
    fontSize: 13,
    marginBottom: 3,
  },
  boxWrapper: {
    flexDirection: "row",
    marginBottom: 10,
  },
  boxText: {
    flex: 1,
    backgroundColor: "#e3e3e3",
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
    color: "#333333",
    paddingVertical: 7,
    marginEnd: 10,
  },
  boxTextVal: {
    width: 40,
    backgroundColor: "#e3e3e3",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
  },
  image: {
    aspectRatio: 1,
    // flex: 1,
    width: "100%",
    height: 250,
  },
});
export default Order;
