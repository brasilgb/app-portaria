import React, { useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import AuthProvider, { AuthContext } from "../contexts/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";
import "./../global.css";

const Root = () => {
  const router = useRouter();
  const [onSetUser, setOnSetUser] = useState<any>(null);

  useEffect(() => {
    const usrLogged = async () => {
      const usuario: any = await AsyncStorage.getItem("Auth_user");
      const resuser = JSON.parse(usuario);
      setOnSetUser(resuser);
    };
    usrLogged();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      if (!!onSetUser) {
        if (onSetUser?.filial === "1") {
          router.replace("solar");
        }

        if (onSetUser?.filial === "26") {
          router.replace("naturovos");
        }
      } else if (!!onSetUser === false) {
        router.replace("auth");
      }
    };
    verifyUser();
  }, [router, onSetUser]);

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default Root;
