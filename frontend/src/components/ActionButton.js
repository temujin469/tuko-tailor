import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SpeedDial, useTheme } from "@rneui/themed";
import { useState } from "react";
import { useQuery } from "react-query";

const ActionButton = ({ navigation }) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const { data: user, isLoading } = useQuery(["currentWorker"], async () => {
    const res = await baseUrl.get("/users/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.user;
  });

  const canAddOrder =
    user?.role === "CEO" ||
    user?.role === "COO" ||
    user?.role === "MANAGER" ||
    user?.role === "DESIGNER";

  return (
    canAddOrder &&
    !isLoading && (
      <SpeedDial
        isOpen={open}
        icon={{ name: "add", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color={theme.colors.primary}
      >
        <SpeedDial.Action
          icon={<FontAwesome name="edit" color="white" size={18} />}
          title="Захиалга оруулах"
          onPress={() => {
            navigation.navigate("AddOrder");
            setOpen(false);
          }}
          color={theme.colors.primary}
        />
        <SpeedDial.Action
          icon={<AntDesign name="adduser" color="white" size={18} />}
          title="Aжилчин бүртгэх"
          onPress={() => {
            navigation.navigate("Register");
            setOpen(false);
          }}
          color={theme.colors.primary}
        />
      </SpeedDial>
    )
  );
};

export default ActionButton;
