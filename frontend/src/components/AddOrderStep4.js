import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { Appbar, RadioButton } from "react-native-paper";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../utils/axios";
import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import Gap from "./Gap";
import catchResponseErr from "../utils/catchResponseErr";

const AddOrderStep4 = ({ info1, info2, info3, goBack, setStep }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // tulburiin medeelel
  const [nuattei, setNuatei] = useState(false);
  const [price1, setPrice1] = useState(null);
  const [price2, setPrice2] = useState(null);
  const [uridchilgaa, setUridchilgaa] = useState({
    price: null,
    // paymentType: "BELEN" | "POS" | "DANS"
    paymentType: null,
  });
  const [uldegdel, setUldegdel] = useState({
    price: null,
    // paymentType: "BELEN" | "POS" | "DANS"
    paymentType: null,
  });

  const { token } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const addOrderMutation = useMutation(
    async (newOrder) => {
      let urls = [];
      let imageExtention = (path) => {
        return path.substring(path.lastIndexOf(".") + 1);
      };

      if (newOrder.images) {
        const dataUrls = newOrder.images.map(
          (image) =>
            `data:image/${imageExtention(image.uri)};base64,${image.base64}`
        );
        const res = await baseUrl.post("/images", { images: dataUrls });
        urls = res.data.urls;
      }
      return await baseUrl.post(
        "/orders",
        { ...newOrder, images: urls },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
        setLoading(false);
        goBack();
      },
      onError: (err) => {
        setLoading(false);
        setError(err);
        alert(catchResponseErr(err));
      },
    }
  );

  const handleAddOrder = () => {
    // const images = info1.images?.map((image) => image.base64);
    const newOrder = {
      ...info1,
      takeDate: info1.dateRange.secondDate,
      startDate: info1.dateRange.firstDate,
      bodyInfo: info2,
      otherInfo: info3,
      paymentInfo: {
        mainPrice: Number(nuattei ? price2 : price1),
        uridchilgaa: {
          price: Number(uridchilgaa.price),
          paymentType: uridchilgaa.paymentType,
        },
        uldegdel: {
          price: Number(uldegdel.price),
          paymentType: uldegdel.paymentType,
        },
      },
    };
    setLoading(true);
    addOrderMutation.mutate(newOrder);
  };

  return (
    <>
      <Appbar.Header elevated style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => setStep(3)} />
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
            Төлбөрийн мэдээлэл
          </Text>
          <View>
            <View>
              <RadioButton.Group
                onValueChange={(newValue) => setNuatei(newValue)}
                value={nuattei}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.container}>
                    <View>
                      <Text style={styles.labelText}>НӨАТ-гүй дүн</Text>
                      <TextInput
                        placeholder="₮"
                        value={price1}
                        onChangeText={(val) => setPrice1(val)}
                      />
                    </View>
                    <RadioButton value={false} />
                  </View>
                  <Gap h={7} />
                  <View style={styles.container}>
                    <View>
                      <Text style={styles.labelText}>НӨАТ-тэй дүн</Text>
                      <TextInput
                        placeholder="₮"
                        value={price2}
                        onChangeText={(val) => setPrice2(val)}
                      />
                    </View>
                    <RadioButton value={true} />
                  </View>
                </View>
              </RadioButton.Group>
              <RadioButton.Group
                onValueChange={(val) =>
                  setUridchilgaa((prev) => ({ ...prev, paymentType: val }))
                }
                value={uridchilgaa.paymentType}
              >
                <View style={{ ...styles.container, width: "100%" }}>
                  <View>
                    <Text style={styles.labelText}>Урьдчилгаа</Text>
                    <TextInput
                      placeholder="₮"
                      value={uridchilgaa.price}
                      onChangeText={(val) =>
                        setUridchilgaa((prev) => ({ ...prev, price: val }))
                      }
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.wrapper}>
                      <Text>Данс</Text>
                      <RadioButton value="DANS" />
                    </View>
                    <View style={styles.wrapper}>
                      <Text>Пос</Text>
                      <RadioButton value="POS" />
                    </View>
                    <View style={styles.wrapper}>
                      <Text>Бэлэн</Text>
                      <RadioButton value="BELEN" />
                    </View>
                  </View>
                </View>
              </RadioButton.Group>
              <RadioButton.Group
                onValueChange={(val) =>
                  setUldegdel((prev) => ({
                    ...prev,
                    paymentType: val,
                  }))
                }
                value={uldegdel.paymentType}
              >
                <View style={{ ...styles.container, width: "100%" }}>
                  <View>
                    <Text style={styles.labelText}>Үлдэгдэл</Text>
                    <TextInput
                      placeholder="₮"
                      value={uldegdel.price}
                      onChangeText={(val) =>
                        setUldegdel((prev) => ({ ...prev, price: val }))
                      }
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.wrapper}>
                      <Text>Данс</Text>
                      <RadioButton value="DANS" />
                    </View>
                    <View style={styles.wrapper}>
                      <Text>Пос</Text>
                      <RadioButton value="POS" />
                    </View>
                    <View style={styles.wrapper}>
                      <Text>Бэлэн</Text>
                      <RadioButton value="BELEN" />
                    </View>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View>
            <Button buttonStyle={{ height: 50 }} onPress={handleAddOrder}>
              Оруулах
            </Button>
            <Spinner visible={loading} />
            {/* {error && <Text>{JSON.stringify(error)}</Text>} */}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  labelText: {
    fontSize: 10,
    color: "#033F63",
  },
  wrapper: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
});

export default AddOrderStep4;
