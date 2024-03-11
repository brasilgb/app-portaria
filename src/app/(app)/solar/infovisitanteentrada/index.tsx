import Loading from "../../../../components/Loading";
import serviceportaria from "../../../../services/serviceportaria";
import { maskHour } from "../../../../utils/masks";
import { cpf } from "cpf-cnpj-validator";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

interface VisitasProps {
  userIn: number;
  filial: number;
  fornecedor: string;
  transportadora: string;
  cpf: number;
  nome: string;
  placa: string;
  nota: number;
  pedido: number;
  horaEntrada: number;
  horaSaida: number;
  dataEntrada: number;
  dataSaida: number;
  quantidade: number;
  destino: string;
  produto: string;
  observacao: string;
}

const InfoVisitanteEntrada = () => {
  const data = useLocalSearchParams();
  
  const [visitasInfo, setVisitasInfo] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVisitasAbertas = async () => {
      setLoading(true);
      await serviceportaria
        .post(`(PORT_LISTA_VISITA_ID)`, {
          ident: data?.ident,
        })
        .then((response) => {
          setVisitasInfo(response.data.visita.data);
        })
        .catch((err) => {
          console.log(err);
        });
        setLoading(false);
    };
    getVisitasAbertas();
  }, []);

  return (
    <>
      <Loading visible={loading} spinercolor="#29ABE2" />
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-col items-center justify-center border-b border-b-gray-300 py-2 mb-4">
            <Text className="text-lg uppercase text-solar-blue-dark font-semibold">
              Informações de visitas
            </Text>
          </View>
          <View className="bg-white border border-gray-300 rounded-lg">
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Visitante
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.nome}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                CPF
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {cpf.format(`${("00000000000" + visitasInfo.cpf).slice(-11)}`)}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Placa
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.placa}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Fornecedor/Prest. serv.
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.fornecedor}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Transportadora
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.transportadora}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Nota
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.nota}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Pedido
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.pedido}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Data entrada
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {moment(visitasInfo.dataEntrada).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Hora entrada
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {maskHour(("0000" + visitasInfo.horaEntrada).slice(-4))}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Quantidade
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.quantidade}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Destino
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.destino}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-b border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Produto/Serviço
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.produto}
              </Text>
            </View>
            <View
              className={`flex-row items-center justify-between border-gray-300`}
            >
              <Text className="flex-1 px-1 py-3 text-base font-normal">
                Observações
              </Text>
              <Text className="flex-1 border-l px-1 py-3 border-gray-300 text-base font-normal">
                {visitasInfo.observacao}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default InfoVisitanteEntrada;
