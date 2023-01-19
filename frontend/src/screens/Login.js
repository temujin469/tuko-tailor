import React, { createRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { login } from "../slices/authSlice";
import { Button } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import MyTextInput from "../components/MyTextInput";

const LoginScreen = () => {
  const { err, loading } = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const handleLogin = ({ password, phoneNumber }) => {
    dispatch(login({ phoneNumber, password }));
  };

  return (
    <View style={styles.mainBody}>
      <Spinner visible={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "ffff", fontSize: 30, marginBottom: 15 }}>
                Нэвтрэх
              </Text>
            </View>
            <View style={styles.wrapper}>
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    style={{ height: 50, marginBottom: 5 }}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Утасны дугаар"
                    value={value}
                    type="numeric"
                    error={errors.phoneNumber}
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
              {errors.phoneNumber && (
                <Text style={styles.errorTextStyle}>
                  Утасны дугаараа оруулан уу?
                </Text>
              )}
            </View>
            <View style={styles.wrapper}>
              <Controller
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    style={{ height: 50, marginBottom: 5 }}
                    onChange={onChange}
                    onBlur={onBlur}
                    label="Нууц үг"
                    value={value}
                    secure={true}
                    error={errors.password}
                  />
                )}
                name="password"
                rules={{
                  required: true,
                }}
                control={control}
              />
              {errors.password && (
                <Text style={styles.errorTextStyle}>Нууц үгээ оруулан уу?</Text>
              )}
            </View>

            <Button
              buttonStyle={{ height: 50, borderRadius: 5, marginTop: 5 }}
              onPress={handleSubmit(handleLogin)}
              containerStyle={{ marginHorizontal: 15 }}
            >
              Нэвтрэх
            </Button>
            {err !== "" ? (
              <Text style={styles.errorTextStyle}>{err}</Text>
            ) : null}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "column",
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  errorTextStyle: {
    color: "red",
  },
});
