import React, { useContext, useEffect, useState } from "react";
import { Slot, Stack, useRouter } from "expo-router";
import AuthProvider, { AuthContext } from "../contexts/auth";
import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackHandler, StatusBar } from "react-native";
import "./../global.css";

const Root = () => {
  const router = useRouter();
  const [onSetUser, setOnSetUser] = useState<any>(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const usrLogged = async () => {
      const usuario: any = await AsyncStorage.getItem("Auth_user");
      const resuser = JSON.parse(usuario);
      setOnSetUser(resuser);
    };
    usrLogged();
  }, [AsyncStorage]);


  useEffect(() => {
    const verifyUser = async () => {

      if (!!onSetUser === false) {
        router.replace("signin");
      }
      if (!!onSetUser) {
        if (onSetUser?.filial === "1") {
          router.replace("solar");
        }

        if (onSetUser?.filial === "26") {
          router.replace("naturovos/statuscarga/carga");
        }
      }
    };
    verifyUser();
  }, [router, onSetUser]);

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          presentation: 'card',
          animationTypeForReplace: 'push',
          animation: 'slide_from_left',
          // animationDuration: 5000
        }}
      >
      </Stack>
    </AuthProvider>
  );
};

export default Root;
