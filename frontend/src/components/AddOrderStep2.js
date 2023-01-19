import { ScrollView, Text, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import MyTextInput from "./MyTextInput";
import NextButton from "./NextButton";
import Gap from "./Gap";
import { Appbar } from "react-native-paper";

const AddOrderStep2 = ({ setInfo2, setStep, info2 }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: info2,
  });

  const handleNext = (input) => {
    // console.log(input);
    setInfo2(input);
    setStep(3);
  };
  return (
    <>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => setStep(1)} />
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
            Биеийн хэмжээ
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              // justifyContent: "space-between",
            }}
          >
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Биеийн өндөр"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="biyiinUdur"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Gap h={7} />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Хөх хоорондын зай"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="huhHoorondiinZai"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Биеийн жин"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="biyiinJin"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Gap h={7} />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Мөрний өргөн"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="murniiUrgun"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Цээжний тойрог"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="tseejniiToirog"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Gap h={7} />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Мөр хоорондын зай"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="murHoorondiinZai"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Өгзөгний тойрог"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="ugzugniiToirog"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Gap h={7} />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Ханцуйн урт"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="hantsuinUrt"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Энгэрийн тойрог"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="engeriinToirog"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Gap h={7} />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Буглагны тойрог"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="buglagniiToirog"
              rules={{
                required: false,
              }}
              control={control}
            />

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Энгэрийн өргөн"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="engeriinUrgun"
              rules={{
                required: false,
              }}
              control={control}
            />

            <Gap h={7} />

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Бугуйн тойрог"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="buguinToirog"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Энгэрийн өндөр"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="engeriinUndur"
              rules={{
                required: false,
              }}
              control={control}
            />

            <Gap h={7} />

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Энгэрийн хүзүүний тойрог"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="engeriinHuzuuniiToirog"
              rules={{
                required: false,
              }}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Арын өргөн"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="ariinUrgun"
              rules={{
                required: false,
              }}
              control={control}
            />

            <Gap h={7} />

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Захны өндөр"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="zahniiUndur"
              rules={{
                required: false,
              }}
              control={control}
            />

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Арын өндөр"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="ariinUndur"
              rules={{
                required: false,
              }}
              control={control}
            />

            <Gap h={7} />

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Эдлэлийн урт"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="edleliinUrt"
              rules={{
                required: false,
              }}
              control={control}
            />

            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  label={"Хөхний өндөр"}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  type="numeric"
                />
              )}
              name="huhniiUndur"
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

export default AddOrderStep2;
