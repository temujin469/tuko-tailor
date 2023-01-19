import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Keyboard, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Button } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import ModalSelector from "react-native-modal-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { baseUrl } from "../utils/axios";
import MyTextInput from "../components/MyTextInput";
import catchResponseErr from "../utils/catchResponseErr";
import { Appbar } from "react-native-paper";

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [err, setErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const data = [
    { key: 0, section: true, label: "Албан тушаал" },
    { key: 1, label: "CEO", value: "CEO" },
    { key: 2, label: "COO", value: "COO" },
    { key: 3, label: "Менежер", value: "MANAGER" },
    {
      key: 4,
      label: "Дизайнер",
      value: "DESIGNER",
    },
    {
      key: 5,
      label: "Эсгүүрчин",
      value: "ESGUURCHIN",
    },
    { key: 6, label: "Оёдолчин", value: "OYDOLCHIN" },
    { key: 7, label: "Хатгамалчин", value: "HATGAMALCHIN" },
    { key: 8, label: "Товч шилбэ", value: "TOWCHSHILBE" },
    { key: 9, label: "Гар чимэглэл", value: "GARCHIMEGLEL" },
  ];
  // "CEO",
  //       "COO",
  //       "MANAGER",
  //       "DESIGNER",
  //       "ESGUURCHIN",
  //       "OYDOLCHIN",
  //       "HATGAMALCHIN",
  //       "TOWCHSHILBE",
  //       "GARCHIMEGLEL"

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  const registerUserMutation = useMutation(
    async (userBody) => {
      return await baseUrl.post("/auth/register", userBody);
    },
    {
      onSuccess: () => {
        setErr("");
        queryClient.invalidateQueries("workers");
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
        setErr(err);
      },
    }
  );

  const handleRegister = (input) => {
    if (input.password1 !== input.password2) {
      setPassErr("Нууц үг таарахгүй байна!!!");
    } else {
      setLoading(true);
      registerUserMutation.mutate({
        ...input,
        role: input.role.value,
        password: input.password1,
      });
      navigation.goBack();
    }
  };

  return (
    <>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Ажилчин бүртгэх" />
      </Appbar.Header>
      <View style={styles.mainBody}>
        <Spinner visible={loading} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ marginTop: 15, marginBottom: 30 }}>
            <View style={styles.SectionStyle}>
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Овог"
                    value={value}
                    error={errors.firstname}
                  />
                )}
                name="firstname"
                rules={{
                  required: true,
                }}
                control={control}
              />
              {/* {errors.phoneNumber && <Text>Утасны дугаараа оруулан уу?</Text>} */}
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Нэр"
                    value={value}
                    error={errors.lastname}
                  />
                )}
                name="lastname"
                rules={{
                  required: true,
                }}
                control={control}
              />
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Утасны дугаар"
                    value={value}
                    error={errors.phoneNumber}
                    type="phone-pad"
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
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Гэрийн утас"
                    value={value}
                    type="phone-pad"
                    error={errors.homePhoneNumber}
                  />
                )}
                name="homePhoneNumber"
                rules={{
                  required: true,
                  maxLength: 8,
                  minLength: 8,
                }}
                control={control}
              />
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <MyTextInput
                      onFocus={() => setShow(!show)}
                      label="Төрсөн өдөр"
                      value={moment(value).subtract(10, "days").calendar()}
                      // disabled
                      onBlur={onBlur}
                      // onChange={onChange}
                      error={errors.birthDate}
                    />
                    {show && (
                      <DateTimePicker
                        mode="date"
                        value={date}
                        onChange={(event, selecteDate) => {
                          setDate(selecteDate);
                          onChange(selecteDate);
                          setShow(false);
                        }}
                        display="default"
                      />
                    )}
                  </View>
                )}
                name="birthDate"
                rules={{
                  required: true,
                }}
                control={control}
              />
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Регистрийн дугаар"
                    value={value}
                    error={errors.registerNumber}
                  />
                )}
                name="registerNumber"
                rules={{
                  required: true,
                }}
                control={control}
              />
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Ургийн овог"
                    value={value}
                    error={errors.owog}
                  />
                )}
                name="owog"
                rules={{
                  required: true,
                }}
                control={control}
              />
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Гэрийн хаяг"
                    value={value}
                    error={errors.address}
                  />
                )}
                name="address"
                rules={{
                  required: true,
                }}
                control={control}
              />
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Нууц үг"
                    value={value}
                    secure={true}
                    error={errors.password1}
                  />
                )}
                name="password1"
                rules={{
                  required: true,
                  maxLength: 12,
                }}
                control={control}
              />
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Нууц үгээ давтах"
                    value={value}
                    secure={true}
                    error={errors.password2 || passErr !== ""}
                  />
                )}
                name="password2"
                rules={{
                  required: true,
                  maxLength: 12,
                }}
                control={control}
              />
              {passErr !== "" ? (
                <Text style={styles.errorTextStyle}>{passErr}</Text>
              ) : null}
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <ModalSelector
                    data={data}
                    // initValue={null}
                    accessible={true}
                    onChange={(option) => onChange(option)}
                  >
                    <MyTextInput
                      label="Албан тушаал"
                      value={value?.label}
                      error={errors.role}
                    />
                  </ModalSelector>
                )}
                name="role"
                rules={{
                  required: true,
                }}
                control={control}
              />
            </View>
            <Button
              buttonStyle={{ height: 50, borderRadius: 5, marginTop: 5 }}
              onPress={handleSubmit(handleRegister)}
              containerStyle={{ marginHorizontal: 15 }}
            >
              Бүртгэх
            </Button>
            {err !== "" ? (
              <Text style={styles.errorTextStyle}>{catchResponseErr(err)}</Text>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default Register;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
  },
  SectionStyle: {
    flexDirection: "column",
    marginHorizontal: 15,
  },

  errorTextStyle: {
    color: "red",
    textAlign: "center",
  },
});
