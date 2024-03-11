import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { Formik } from "formik";
import schema from "./schema";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Loading from "@/components/Loading";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
interface SignInProps {
  code: string;
  filial: string;
  password: string;
}

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, signIn, validateUser, historyFilial } = useContext(AuthContext);
  const [selectedPortaria, setSelectedPortaria] = useState(historyFilial);
  const [showPassword, setShowPassword] = useState(false);

  const handlePortaria = (option: any) => {
    setModalVisible(false);
    setSelectedPortaria(option);
  };

  const onsubmit = async (values: SignInProps, { resetForm }: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    const resp = await validateUser({ alternative: `${values.code}` });
    const logged = await signIn({
      code: resp.userCode,
      nome: resp.userName,
      filial: values.filial,
      password: values.password,
    });
    if (logged) {
      setLoading(false);
      resetForm({});
    }
  };

  const ModalFilial = () => {
    return (
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View className="flex-1 items-center justify-center bg-[#11204b73]">
          <View className="m-5 py-[5px] bg-gray-200 rounded-md border-2 border-white z-10" style={{ width: WIDTH - 50 }}>
            <View className="pb-2">
              <TouchableOpacity onPress={() => handlePortaria("")}>
                <View className="flex-row items-center justify-between border-b border-b-gray-300">
                  <Text className="py-2 px-4 text-xl text-solar-blue-dark font-Poppins_500Medium">
                    Selecione a portaria
                  </Text>
                  <MaterialIcons name="close" size={30} color="#FAA335" />
                </View>
              </TouchableOpacity>
              <View className="flex-col items-start justify-start py-4 w-full">
                <TouchableOpacity
                  onPress={() => handlePortaria("1")}
                  className="w-full"
                >
                  <Text className="py-2 px-4 text-lg text-gray-600 font-Poppins_500Medium">
                    {" "}
                    1 - Portaria Matriz
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePortaria("26")}
                  className="w-full"
                >
                  <Text className="py-2 px-4 text-lg text-gray-600 font-Poppins_500Medium">
                    26 - Portaria Naturovos
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <Loading visible={loading} spinercolor={"#29ABE2"} />
      <View className="flex-1 items-center justify-center bg-solar-blue-light">
        <ModalFilial />
        <View className="py-8">
          <Image
            source={require("../../assets/logo-solar.png")}
            className="w-[320px] h-[116px]"
          />
        </View>
        <Formik
          validationSchema={schema}
          initialValues={{
            code: "",
            password: "",
            filial: "",
          }}
          onSubmit={onsubmit}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldTouched,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <View className="bg-gray-200 px-8 pt-10 w-10/12 rounded">
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <View pointerEvents="none" className="mt-6 flex-col items-center justify-center">
                  <TextInput
                    className={`rounded-full border-4 ${selectedPortaria === '1' ? 'border-solar-blue-dark text-4xl' : selectedPortaria === '26' ? 'border-solar-yellow-dark text-4xl' : 'border-solar-blue-light bg-white text-xl'} w-32 h-32 text-gray-700 text-center font-bold flex-row items-center justify-center`}
                    onChangeText={handleChange("filial")}
                    onBlur={() => setFieldTouched("filial")}
                    value={(values.filial = selectedPortaria)}
                    placeholder="FILIAL"
                  />
                </View>
                {touched && errors && (
                  <Text className="self-end pr-6 pt-1 text-base text-red-600">
                    {errors.filial}
                  </Text>
                )}
              </Pressable>

              <View className="mt-6">
                <Text className="label-form">Usuário</Text>
                <TextInput
                  className={`input-form `}
                  onChangeText={handleChange("code")}
                  onBlur={() => setFieldTouched("code")}
                  value={values.code}
                />
                {touched && errors && (
                  <Text className="self-end pr-6 pt-1 text-base text-red-600">
                    {errors.code}
                  </Text>
                )}
              </View>

              <View className="mt-6 relative">
                <Text className="label-form">Senha</Text>
                <TextInput
                  className={`input-form`}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  value={values.password}
                  secureTextEntry={!showPassword ? true : false}
                />
                {touched && errors && (
                  <Text className="self-end pr-6 pt-1 text-base text-red-600">
                    {errors.password}
                  </Text>
                )}
                {!showPassword ? (
                  <Ionicons
                    name="eye"
                    size={32}
                    color="#64748b"
                    className="absolute top-10 right-4"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Ionicons
                    name="eye-off"
                    size={32}
                    color="#64748b"
                    className="absolute top-10 right-4"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                )}
              </View>

              <Pressable
                className={`flex items-center justify-center ${!isValid || !selectedPortaria
                  ? "bg-solar-blue-light"
                  : `${selectedPortaria === '1' ? 'bg-solar-blue-dark text-4xl' : 'bg-solar-yellow-dark'}`
                  } mt-10 py-4 rounded-full`}
                onPress={handleSubmit as any}
                disabled={selectedPortaria ? false : true}
              >
                <Text
                  className={`text-xl font-medium ${!isValid || !selectedPortaria
                    ? "text-gray-50"
                    : `${selectedPortaria === '1' ? 'text-solar-gray-light text-4xl' : 'text-gray-700'}`
                    }`}
                >
                  ENTRAR
                </Text>
              </Pressable>
              <View className="items-center my-6">
                <Text className="text-sm text-gray-400 font-Poppins_500Medium">
                  Grupo Solar - App Portaria v{process.env.EXPO_PUBLIC_APP_VERSION}
                </Text>
              </View>
            </View>
          )}
        </Formik>
        <StatusBar style="light" />
      </View>
    </>
  );
};

export default SignIn;
