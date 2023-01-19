import React from "react";
import { Avatar } from "@rneui/themed";

const AvatarImage = ({ role, size }) => {
  return (
    <Avatar
      source={
        role === "CEO"
          ? require(`../../assets/image/user2.png`)
          : role === "COO"
          ? require(`../../assets/image/user3.png`)
          : role === "DESIGNER"
          ? require(`../../assets/image/user4.png`)
          : role === "OYDOLCHIN"
          ? require(`../../assets/image/user.png`)
          : role === "ESGUURCHIN"
          ? require(`../../assets/image/user4.png`)
          : role === "MANAGER"
          ? require(`../../assets/image/user4.png`)
          : require(`../../assets/image/user4.png`)
      }
      rounded
      size={size}
    />
  );
};

export default AvatarImage;
