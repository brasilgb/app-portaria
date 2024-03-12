import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import serviceportaria from "../../../../../services/serviceportaria";
import { maskHour } from "../../../../../utils/masks";
import moment from "moment";
import { cpf } from "cpf-cnpj-validator";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import servicelogin from "../../../../../services/servicelogin";
import Loading from "../../../../../components/Loading";
import TextoModal from "@/components/TextoModal";

interface VisitasProps {
  userOut: number;
  filial: number;
  fornecedor: string;
  transportadora: string;
  cpf: string;
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

const InfoVisitanteSaida = () => {
  const data = useLocalSearchParams();
  const [visitasInfo, setVisitasInfo] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVisitasAbertas = async () => {
      setLoading(true);
      await serviceportaria
        .post(`(PORT_LISTA_VISITA_ID)`, {
          ident: data.ident,
        })
        .then((response) => {
          setLoading(false);
          setVisitasInfo(response.data.visita.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getVisitasAbertas();
  },[]);

  return (
    <>
      <Loading visible={loading} spinercolor="#29ABE2" />
      <View className="">
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-col items-center justify-center border-b border-b-gray-300 py-2 mb-4">
            <Text className="text-lg uppercase text-solar-blue-dark font-semibold">
              Informação do visitante
            </Text>
          </View>

          <View className="bg-white border border-gray-300">
            <TextoModal title="Visitante" value={visitasInfo.nome} />
            <TextoModal title="CPF" value={cpf.format(`${("00000000000" + visitasInfo.cpf).slice(-11)}`)} />
            <TextoModal title="Placa" value={visitasInfo.placa} />
            <TextoModal title="Fornecedor" value={visitasInfo.fornecedor} />
            <TextoModal title="Transportadora" value={visitasInfo.transportadora} />
            <TextoModal title="Nota" value={visitasInfo.nota} />
            <TextoModal title="Pedido" value={visitasInfo.pedido} />
            <TextoModal title="Data entrada" value={moment((visitasInfo.dataEntrada)?.toString()).format("DD/MM/YYYY")} />
            <TextoModal title="Data saída" value={moment((visitasInfo.dataSaida)?.toString()).format("DD/MM/YYYY")} />
            <TextoModal title="Hora entrada" value={maskHour(("0000" + visitasInfo.horaEntrada).slice(-4))} />
            <TextoModal title="Hora saída" value={maskHour(("0000" + visitasInfo.horaSaida).slice(-4))} />
            <TextoModal title="Quantidade" value={visitasInfo.quantidade} />
            <TextoModal title="Destino" value={visitasInfo.destino} />
            <TextoModal title="Produto/Serviço" value={visitasInfo.produto} />
            <TextoModal title="Observações" value={visitasInfo.observacoes} />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default InfoVisitanteSaida;
