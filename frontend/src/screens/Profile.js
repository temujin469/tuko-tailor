import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Skeleton } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { logout } from "../slices/authSlice";
import { useQuery } from "react-query";
import WorkerInfoLists from "../components/WorkerInfoLists";
import { getUserById } from "../api/user";

const Profile = ({ navigation }) => {
  const { token, worker: currentWorker } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data: worker,
    isLoading,
    error,
  } = useQuery(["currentWorker", { allInfo: true }], () =>
    getUserById({ token: token, select: "-password", id: currentWorker._id })
  );

  return (
    <View>
      {/* <ContactHeader lastname={user.lastname} role={user.role} /> */}
      <Header navigation={navigation} />
      <View>
        {!isLoading && !error ? (
          <ScrollView style={{ marginBottom: 280 }}>
            <WorkerInfoLists worker={worker} />
            <View>
              <Button
                title={"Гарах"}
                size={"lg"}
                buttonStyle={{ margin: 10 }}
                onPress={() => dispatch(logout())}
              />
            </View>
          </ScrollView>
        ) : isLoading && !error ? (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  style={{ marginTop: 10 }}
                  animation="wave"
                  width={"95%"}
                  height={50}
                />
              ))}
          </View>
        ) : (
          <Text>{`${error}`}</Text>
        )}
      </View>
    </View>
  );
};

export default Profile;
