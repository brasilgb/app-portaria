import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import serviceportaria from "../../../services/serviceportaria";
import Loading from "../../../components/Loading";
import { AuthContext } from "../../../contexts/auth";

const StatusCarga = () => {
  const { status } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const [listStatus, setListStatus] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getListStatus = async () => {
      setLoading(true);
      await serviceportaria
        .post("(PORT_STATUS_VEICULOS)", {
          caller: 0,
          filial: user?.filial,
          status: `${status}`,
        })
        .then((result) => {
          const { success, data } = result.data.veiculos;
          setLoading(false);
          setListStatus(data);
        });
    };
    getListStatus();
  }, [status]);

  const StatusCarga = (status: any) => {
    switch (status) {
      case "1":
        return "Informar nota";
      case "2":
        return "Entrada";
      case "3":
        return "Saída";
    }
  };

  return (
    <>
      <Loading visible={loading} spinercolor="#F18800" />
      <View>
        <View className="flex-col items-start justify-center border-b border-b-gray-300 py-2 mb-4">
          <Text className="text-lg uppercase text-solar-blue-dark font-semibold">
            Cargas aguardando {StatusCarga(status)}
          </Text>
        </View>
        <View className="p-1 bg-white border-gray-300 rounded-md">
          <View className="bg-gray-100 flex-row items-center justify-start border-y border-x border-gray-300">
            <Text className="pl-1 w-20 px-1 py-3 border-r border-gray-300 text-base font-medium">
              Código
            </Text>
            <Text className="pl-1 w-16 py-3 border-r border-gray-300 text-base font-medium">
              Pager
            </Text>
            <Text className="pl-1 w-28 py-3 border-r border-gray-300 text-base font-medium">
              Placa
            </Text>
            <Text className="pl-1 w-44 py-3 border-r border-gray-300 text-base font-medium">
              Produto
            </Text>
            <Text className="pl-1 py-3 text-base font-medium">Data/Hora</Text>
          </View>
          {listStatus &&
            listStatus.map((list: any, idx: number) => (
              <View
                key={idx}
                className={`${
                  idx % 2 ? "bg-blue-50" : "bg-gray-50"
                } flex-row items-center justify-start border-b border-x border-gray-300`}
              >
                <Text className="pl-1 w-20 px-1 py-3 border-r border-gray-300 text-base font-normal">
                  {list.codigo}
                </Text>
                <Text className="pl-1 w-16 py-3 border-r border-gray-300 px-1 text-base font-normal">
                  {list.pager}
                </Text>
                <Text className="pl-1 w-28 py-3 border-r border-gray-300 text-base font-normal">
                  {list.placa}
                </Text>
                <Text className="pl-1 w-44 py-3 border-r border-gray-300 text-base font-normal">
                  {list.produto}
                </Text>
                <Text className="pl-1 text-base font-normal">
                  {list.dhChegada}
                </Text>
              </View>
            ))}
        </View>
      </View>
    </>
  );
};

export default StatusCarga;
