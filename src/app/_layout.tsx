import React, { useContext, useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import AuthProvider, { AuthContext } from "../contexts/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler } from "react-native";
import "./../global.css";

const Root = () => {
  const router = useRouter();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      const usuario: any = await AsyncStorage.getItem("Auth_user");
      const setUser = JSON.parse(usuario);
      
      if (!setUser) {
        router.replace("sign-in");
      }
      if (setUser) {
        if (setUser?.filial === "1") {
          router.replace("solar");
        }

        if (setUser?.filial === "26") {
          router.replace("naturovos");
        }
      }
    };
    verifyUser();
  }, [router]);

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default Root;
