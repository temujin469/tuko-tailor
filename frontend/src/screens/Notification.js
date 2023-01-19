import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Appbar, Divider } from "react-native-paper";
import moment from "moment";

const Notification = ({ navigation }) => {
  const notifs = [
    {
      info: "“Алтансүх” захиалгын хугацаа дөхлөө",
      createdAt: "2022-12-04",
      _id: 0,
    },
    {
      info: "““Алтансүх” захиалгын хугацаа хэтэрлээ",
      createdAt: "2022-12-04",
      _id: 1,
    },
    {
      info: "“Танд захиалга нэмэгдлээ",
      createdAt: "2022-12-04",
      _id: 2,
    },
    {
      info: "“Засвар гарсан",
      createdAt: "2022-12-04",
      _id: 3,
    },
  ];

  return (
    <View>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Мэдэгдэл" />
      </Appbar.Header>
      <FlatList
        data={notifs}
        renderItem={({ item: notif, separators }) => (
          <TouchableOpacity key={notif._id}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 50,
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ flex: 1, marginEnd: 20 }}>{notif.info}</Text>
              <Text style={{ color: "#808080" }}>
                {moment(notif.createdAt).startOf("hour").fromNow()}
              </Text>
            </View>
            <Divider />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Notification;
