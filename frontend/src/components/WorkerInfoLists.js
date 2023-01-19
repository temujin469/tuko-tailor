import moment from "moment";
import React from "react";
import { View } from "react-native";
import InfoList from "./InfoList";

const WorkerInfoLists = ({ worker }) => {
  return (
    <View>
      <InfoList
        title="Овог"
        value={worker.lastname}
        tvlhvvr={"lastname"}
        workerId={worker?._id}
      />
      <InfoList
        title="Нэр"
        value={worker.firstname}
        tvlhvvr={"firstname"}
        workerId={worker?._id}
      />
      <InfoList
        title="Ургийн овог"
        value={worker.owog}
        tvlhvvr={"owog"}
        workerId={worker?._id}
      />
      <InfoList
        title="Регистрийн дугаар"
        value={worker.registerNumber}
        tvlhvvr={"registerNumber"}
        workerId={worker?._id}
      />
      <InfoList
        title="Төрсөн өдөр"
        value={moment(worker.birthDate).format("DD/MM/YYYY")}
        tvlhvvr={"birthDate"}
        workerId={worker?._id}
      />
      <InfoList
        title="Гар утас"
        value={worker.phoneNumber?.toString()}
        tvlhvvr={"phoneNumber"}
        workerId={worker?._id}
      />
      <InfoList
        title="Гэрийн утас"
        value={worker.homePhoneNumber?.toString()}
        tvlhvvr={"homePhoneNumber"}
        workerId={worker?._id}
      />
      <InfoList
        title="Гэрийн хаяг"
        value={worker.address}
        tvlhvvr={"address"}
        workerId={worker?._id}
      />
      <InfoList
        title="Ажилд орсон огноо"
        value={moment(worker.createdAt).format("DD/MM/YYYY")}
        tvlhvvr={"hiredDate"}
        workerId={worker?._id}
      />
    </View>
  );
};

export default WorkerInfoLists;
