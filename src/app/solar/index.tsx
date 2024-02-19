import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { ButtonAction } from "../../components/Buttons";
import { Formik } from "formik";
import schema from "./schema";
import { cpf } from "cpf-cnpj-validator";
import serviceportaria from "../../services/serviceportaria";
import { router } from "expo-router";
import Loading from "../../components/Loading";
import { AuthContext } from "../../contexts/auth";

interface HomeProps {
  cpf: string;
  pedido: string;
}

const Solar = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onsubmit = async (values: HomeProps, { resetForm }: any) => {
    setLoading(true);
    await serviceportaria
      .post('(PORT_VALIDA_VISITANTE)', {
        cpf: values.cpf,
      })
      .then((response) => {
        const { success, message, data } = response.data.visitante;
        resetForm();
        setLoading(false);
        let visitantes = {
          cpf: values.cpf,
          pedido: values.pedido,
          visitante: success ? data.visitante : "",
          transportadora: success ? data.transportadora : "",
        };
        router.push({
          pathname: "solar/registervisitors",
          params: visitantes,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Loading visible={loading} spinercolor="#29ABE2" />
      <View className="flex-row items-center justify-between">
        <ButtonAction
          bgcolor="bg-green-500"
          textcolor="text-gray-50"
          title="Histórico"
          icon="history"
          href="solar/historicovisitas"
          btnwidth="w-60"
        />
        <ButtonAction
          bgcolor="bg-red-500"
          textcolor="text-gray-50"
          title="Saídas pendentes"
          icon="exit-run"
          href="solar/saidaspendentes"
          btnwidth="w-60"
        />
      </View>

      <View className="">
        <Formik
          enableReinitialize
          validationSchema={schema}
          initialValues={{
            cpf: " ",
            pedido: " ",
          }}
          onSubmit={onsubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldTouched,
            values,
            touched,
            errors,
            isValid,
          }) => (
            <View className="my-4">
              {/* <FormObserver /> */}
              <View className="mt-6">
                <Text className="label-form">CPF do Motorista</Text>

                <TextInput
                  className={`input-form ${
                    touched && errors.cpf
                      ? "text-red-600 border-red-600"
                      : "text-solar-blue-dark border-gray-400"
                  }`}
                  onChangeText={handleChange("cpf")}
                  onBlur={() => setFieldTouched("cpf")}
                  value={cpf.format(values.cpf)}
                />
                {touched && errors && (
                  <Text className="self-end pr-6 pt-1 text-xs text-red-600">
                    {errors.cpf}
                  </Text>
                )}
              </View>
              <View className="mt-6">
                <Text className="label-form">Número do pedido</Text>
                <TextInput
                  className={`input-form ${
                    touched && errors.pedido
                      ? "text-red-600 border-red-600"
                      : "text-solar-blue-dark border-gray-400"
                  }`}
                  onChangeText={handleChange("pedido")}
                  onBlur={() => setFieldTouched("pedido")}
                  value={values.pedido}
                />
                {touched && errors && (
                  <Text className="self-end pr-6 pt-1 text-xs text-red-600 font-">
                    {errors.pedido}
                  </Text>
                )}
              </View>
              <Pressable
                className={`flex items-center justify-center ${
                  !isValid ? "bg-solar-gray-dark" : "bg-solar-orange-middle"
                } mt-10 py-4 rounded-full`}
                onPress={handleSubmit as any}
              >
                <Text
                  className={`text-lg font-medium ${
                    !isValid ? "text-gray-300" : "text-solar-blue-dark"
                  }`}
                >
                  Continuar
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

export default Solar;
