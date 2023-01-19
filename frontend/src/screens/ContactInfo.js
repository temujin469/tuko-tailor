import React from "react";
import { View, ScrollView, Text } from "react-native";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getUserById } from "../api/user";
import ContactHeader from "../components/ContactHeader";
import WorkerInfoLists from "../components/WorkerInfoLists";

const ContactInfo = ({ route, navigation }) => {
  const { workerId } = route.params;
  const { token } = useSelector((state) => state.auth);

  const {
    data: worker,
    isLoading,
    error,
  } = useQuery(["worker", workerId], () =>
    getUserById({ token, id: workerId, select: "-password" })
  );

  return (
    <View>
      <ContactHeader
        name={worker?.firstname}
        role={worker?.role}
        navigation={navigation}
      />
      <View>
        <ScrollView>
          {isLoading ? (
            <Text>loading..</Text>
          ) : error ? (
            <Text>{JSON.stringify(error)}</Text>
          ) : (
            <WorkerInfoLists worker={worker} />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ContactInfo;
