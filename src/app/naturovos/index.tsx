import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Formik } from "formik";
import schema from "./schema";
import { router, useLocalSearchParams } from "expo-router";
import serviceportaria from "../../services/serviceportaria";
import { FlashList } from "@shopify/flash-list";
import { AuthContext } from "../../contexts/auth";
import { ButtonAction } from "../../components/Buttons";
import Loading from "../../components/Loading";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

interface RegisterProps {
  filial: string;
  codigo: string;
  nome: string;
  placa: string;
  motorista: string;
  produto: string;
  pager: string;
}

const Naturovos = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [transportadora, setTransportadora] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  const onsubmit = async (values: RegisterProps, { resetForm }: any) => {
    setLoading(true);
    await serviceportaria
      .post(`(PORT_CHEGADA)`, {
        filial: user?.filial,
        user: user?.code,
        transportadora: {
          codigo: values.codigo,
          nome: values.nome,
        },
        placa: values.placa,
        motorista: values.motorista,
        produto: values.produto,
        pager: values.pager,
      })
      .then((response) => {
        const { success } = response.data.genericResponse;
        if (success) {
          Alert.alert("Sucesso", "Carga cadastrada com sucesso");
          setLoading(false);
        }
        setTransportadora([]);
        resetForm({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getTransportadora = async () => {
      await serviceportaria
        .post("(PORT_TRANSPORTADORAS)", {
          caller: 0,
          filtro: "",
        })
        .then((result) => {
          const { data, success } = result.data.veiculos;
          setFilteredData(data);
          setMasterData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTransportadora();
  }, []);

  const searchFilter = (text: any) => {
    if (text.length) {
      const newData = masterData.filter(function (item: any) {
        if (item) {
          const itemData = item?.nome.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
    } else {
      setFilteredData(masterData);
    }
    setSearch(text);
  };

  const ItemView = ({ item }: any) => {
    return (
      <Text 
      className="text-sm font-medium py-0.5"
      onPress={() => getItem(item)}
      >
        {item.codigo}
        {" - "}
        {item.nome}
      </Text>
    );
  };

  const getItem = (item: any) => {
    setTransportadora(item);
    setSearch("");
    setModalVisible(false);
  };

  return (
    <>
      <Loading visible={loading} spinercolor="#29ABE2" />
      <Modal
        statusBarTranslucent={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-[#00000060]">
          <View
            className=" bg-white shadow-lg shadow-black py-4 px-3 mx-2"
            style={{ width: WIDTH - 100, height: HEIGHT - 100 }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <TextInput
                  className="py-2 px-3 rounded-lg text-lg bg-white  border border-gray-200 placeholder:text-slate-400 shadow-md shadow-slate-500"
                  onChangeText={(text) => searchFilter(text)}
                  value={search}
                />
              </View>
              <View className="flex-none ml-2">
                <Ionicons
                  name="close"
                  size={32}
                  color="#919090"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
            <View className="flex-1 mt-4">
              <FlashList
                data={filteredData}
                keyExtractor={(item: any) => item.codigo}
                renderItem={({ item }: any) => <ItemView item={item} />}
                estimatedItemSize={50}
                keyboardShouldPersistTaps={"always"}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View className="pb-[12rem]">
        <KeyboardAvoidingView behavior={undefined} keyboardVerticalOffset={0}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-col items-start justify-center border-b border-b-gray-300 py-2 mb-4">
              <Text className="text-lg uppercase text-solar-blue-dark font-semibold">
                Cargas aguardando
              </Text>
            </View>
            <View className="flex-row items-center justify-between gap-4">
              <ButtonAction
                bgcolor="bg-green-500"
                textcolor="text-gray-50"
                title="Informar Nota"
                icon="file-document"
                href="naturovos/statuscarga"
                params="1"
                btnwidth="w-60"
              />
              <ButtonAction
                bgcolor="bg-orange-500"
                textcolor="text-gray-50"
                title="Entrada"
                icon="arrow-right-bold-box"
                href="naturovos/statuscarga"
                params="2"
                btnwidth="w-48"
              />
              <ButtonAction
                bgcolor="bg-blue-500"
                textcolor="text-gray-50"
                title="Saída"
                icon="arrow-left-bold-box"
                href="naturovos/statuscarga"
                params="3"
                btnwidth="w-48"
              />
            </View>
            <View className="flex-col items-start justify-center border-b border-b-gray-300 py-2 my-4">
              <Text className="text-lg uppercase text-solar-blue-dark font-semibold">
                Cadastrar chegada de carga
              </Text>
            </View>
            <View className="flex-row items-center justify-start w- mx-0 py-4 border-b border-gray-300">
              <MaterialCommunityIcons name="alert" size={20} color="red" />
              <Text className="ml-1 text-base text-red-400 font-medium">
                Preencha corretamente os campos abaixo{" "}
              </Text>
            </View>

            <View className="pb-10">
              <Formik
                enableReinitialize
                validationSchema={schema}
                initialValues={{
                  filtro: "",
                  user: "",
                  filial: "",
                  codigo: transportadora.codigo
                    ? transportadora.codigo.toString()
                    : "0",
                  nome: transportadora.nome ? transportadora.nome : "",
                  placa: "",
                  motorista: "",
                  produto: "",
                  pager: "",
                }}
                onSubmit={onsubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  setValues,
                  setFieldValue,
                  handleSubmit,
                  setFieldTouched,
                  values,
                  touched,
                  errors,
                  isValid,
                }) => (
                  <View className="mt-6">
                    <Pressable onPress={() => setModalVisible(true)}>
                      <View pointerEvents="none">
                        <Text className="label-form">
                          Buscar transportadora
                        </Text>
                        <TextInput
                          className={`input-form `}
                          onChangeText={handleChange("codigo")}
                          onBlur={() => setFieldTouched("codigo")}
                          value={values.codigo}
                          underlineColorAndroid="transparent"
                        />
                        {touched && errors && (
                          <Text className="self-end pr-6 pt-1 text-base text-red-600">
                            {errors.codigo}
                          </Text>
                        )}
                      </View>
                    </Pressable>
                    <View>
                      <Text className="label-form">Transportadora</Text>
                      <TextInput
                        className={`input-form `}
                        onChangeText={handleChange("nome")}
                        onBlur={() => setFieldTouched("nome")}
                        value={values.nome}
                      />
                      {touched && errors && (
                        <Text className="self-end pr-6 pt-1 text-base text-red-600">
                          {errors.nome}
                        </Text>
                      )}
                    </View>
                    <View className="">
                      <Text className="label-form">Placa</Text>
                      <TextInput
                        className={`input-form `}
                        onChangeText={handleChange("placa")}
                        onBlur={() => setFieldTouched("placa")}
                        value={values.placa}
                        autoCapitalize="characters"
                        maxLength={7}
                      />
                      {touched && errors && (
                        <Text className="self-end pr-6 pt-1 text-base text-red-600">
                          {errors.placa}
                        </Text>
                      )}
                    </View>
                    <View className="">
                      <Text className="label-form">Nome do motorista</Text>
                      <TextInput
                        className={`input-form `}
                        onChangeText={handleChange("motorista")}
                        onBlur={() => setFieldTouched("motorista")}
                        value={values.motorista}
                        autoCapitalize="characters"
                      />
                      {touched && errors && (
                        <Text className="self-end pr-6 pt-1 text-base text-red-600">
                          {errors.motorista}
                        </Text>
                      )}
                    </View>
                    <View className="">
                      <Text className="label-form">Tipo de mercadoria</Text>
                      <TextInput
                        className={`input-form `}
                        onChangeText={handleChange("produto")}
                        onBlur={() => setFieldTouched("produto")}
                        value={values.produto}
                        autoCapitalize="characters"
                      />
                      {touched && errors && (
                        <Text className="self-end pr-6 pt-1 text-base text-red-600">
                          {errors.produto}
                        </Text>
                      )}
                    </View>
                    <View className="">
                      <Text className="label-form">ID Pager</Text>
                      <TextInput
                        className={`input-form `}
                        onChangeText={handleChange("pager")}
                        onBlur={() => setFieldTouched("pager")}
                        value={values.pager}
                        autoCapitalize="characters"
                      />
                      {touched && errors && (
                        <Text className="self-end pr-6 pt-1 text-base text-red-600">
                          {errors.pager}
                        </Text>
                      )}
                    </View>
                    <View className="mt-6">
                      <Pressable
                        className={`flex items-center justify-center ${
                          !isValid
                            ? "bg-solar-gray-dark"
                            : "bg-solar-orange-middle"
                        } mt-10 py-4 rounded-full`}
                        onPress={handleSubmit as any}
                      >
                        <Text
                          className={`text-lg font-medium ${
                            !isValid ? "text-gray-300" : "text-solar-blue-dark"
                          }`}
                        >
                          Registrar chegada
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default Naturovos;
