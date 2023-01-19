import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MyTextInput from "./MyTextInput";
import { Button, Image, useTheme } from "@rneui/themed";
import { Appbar, Modal, Portal } from "react-native-paper";
import moment from "moment";
import DateRangePicker from "@statsministeriet/rn-select-date-range";
import Gap from "./Gap";
import NextButton from "./NextButton";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "@rneui/themed";

const AddOrderStep1 = ({ setStep, setInfo1, info1, goBack }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: info1,
  });

  const [images, setImages] = useState(info1.images);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      base64: true,
      allowsMultipleSelection: true,
      selectionLimit: 4,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets ? result.assets : result.selected);
    }
  };

  const handleNext = (input) => {
    setInfo1({ ...input, images });
    setStep(2);
  };

  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const windowWidth = Dimensions.get("window").width;

  return (
    <>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Захиалга оруулах" />
      </Appbar.Header>
      <ScrollView>
        <View style={{ marginHorizontal: 15 }}>
          <Text
            style={{
              paddingBottom: 10,
              paddingTop: 10,
              fontSize: 20,
              color: "#808080",
            }}
          >
            Үндсэн мэдээлэл
          </Text>

          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Нэр"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.name}
                />
              )}
              name="name"
              rules={{
                required: true,
              }}
              control={control}
            />
            <Gap h={7} />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Утас"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.phoneNumber}
                  type="numeric"
                />
              )}
              name="phoneNumber"
              rules={{
                required: true,
                maxLength: 8,
                minLength: 8,
              }}
              control={control}
            />
          </View>
          <View>
            <Controller
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={{
                      ...styles.container,
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Text>{`${moment(value?.firstDate).format(
                      "YYYY/MM/DD"
                    )}-${moment(value?.secondDate).format(
                      "YYYY/MM/DD"
                    )}`}</Text>
                  </TouchableOpacity>
                  {visible && (
                    <Portal>
                      <Modal
                        visible={visible}
                        onDismiss={() => setVisible(false)}
                        contentContainerStyle={{
                          backgroundColor: "#fff",
                          margin: 20,
                          padding: 20,
                          borderRadius: 20,
                        }}
                      >
                        <DateRangePicker
                          onSelectDateRange={onChange}
                          blockSingleDateSelection={true}
                          responseFormat="YYYY-MM-DD"
                          // maxDate={moment().subtract(100, "days")}
                          minDate={moment()}
                          onConfirm={() => setVisible(false)}
                          selectedDateContainerStyle={{
                            ...styles.selectedDateContainerStyle,
                            backgroundColor: theme.colors.primary,
                          }}
                          selectedDateStyle={styles.selectedDateStyle}
                        />
                      </Modal>
                    </Portal>
                  )}
                </View>
              )}
              name="dateRange"
              rules={{
                required: true,
              }}
              control={control}
            />
          </View>
        </View>

        <Button
          buttonStyle={{
            marginHorizontal: 15,
            marginBottom: 15,
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            borderStyle: "dashed",
          }}
          titleStyle={{
            color: "gray",
          }}
          type="clear"
          onPress={pickImage}
        >
          Зураг оруулах
          <FontAwesome
            style={{ marginLeft: 10 }}
            name="file-photo-o"
            size={24}
            color="gray"
          />
        </Button>
        <FlatList
          horizontal={true}
          pagingEnabled
          data={images}
          keyExtractor={(item) => item.uri}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={{ width: windowWidth, height: 250 }}
            />
          )}
        />
        <View style={{ margin: 15 }}>
          <NextButton onPress={handleSubmit(handleNext)} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 145,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",

    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dateContainer: {
    position: "absolute",
    width: "100%",
    zIndex: 10,
    backgroundColor: "#fff",
  },
  selectedDateContainerStyle: {
    height: 35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "white",
  },
});

export default AddOrderStep1;
