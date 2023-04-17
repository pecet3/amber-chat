import React from "react";
import axios from "axios";
export const useGetAvatar = () => {
  const [avatar, setAvatar] = React.useState({
    message: "",
    status: "",
  });

  const getAvatar = async () => {
    try {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      setAvatar(result.data);
    } catch (err) {
      console.error(err);
    }
  };
  return { avatar, getAvatar };
};
