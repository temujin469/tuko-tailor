import { ScrollView, Text, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MyTextInput from "./MyTextInput";
import NextButton from "./NextButton";
import Gap from "./Gap";
import { Appbar } from "react-native-paper";

const AddOrderStep3 = ({ setInfo3, setStep, info3 }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: info3,
  });

  const handleNext = (input) => {
    // console.log(input);
    setInfo3(input);
    setStep(4);
  };
  return (
    <>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => setStep(2)} />
        <Appbar.Content title="Буцах" />
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
            Тайлбар
          </Text>
          <View>
            <Controller
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  label="Үндсэн материал"
                  value={value}
                  multiline={true}
                  onChange={onChange}
                />
              )}
              name="undsenMaterial"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  label="Эмжээр"
                  value={value}
                  multiline={true}
                  onChange={onChange}
                />
              )}
              name="emjeer"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  label="Хавчаар"
                  value={value}
                  multiline={true}
                  onChange={onChange}
                />
              )}
              name="hawchaar"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  label="Товч шилбэ"
                  value={value}
                  multiline={true}
                  onChange={onChange}
                />
              )}
              name="towchShilbe"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  label="Бүс"
                  value={value}
                  multiline={true}
                  onChange={onChange}
                />
              )}
              name="bus"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  label="Хатгамал"
                  value={value}
                  multiline={true}
                  onChange={onChange}
                />
              )}
              name="hatgamal"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  label="Чимэглэл"
                  value={value}
                  multiline={true}
                  onChange={onChange}
                />
              )}
              name="chimeglel"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, value } }) => (
                <MyTextInput
                  label="Бусад"
                  value={value}
                  multiline={true}
                  onChange={onChange}
                />
              )}
              name="otherInfo"
              rules={{
                required: false,
              }}
              control={control}
            />
          </View>

          <View>
            <NextButton onPress={handleSubmit(handleNext)} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AddOrderStep3;
