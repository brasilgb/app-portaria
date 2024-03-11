import { View, Text, Modal, TouchableOpacity, Dimensions, TextInput, Pressable, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import serviceportaria from "../../../../../services/serviceportaria";
import Loading from "../../../../../components/Loading";
import { AuthContext } from "../../../../../contexts/auth";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { ptForm } from "yup-locale-pt";
Yup.setLocale(ptForm);
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface RegisterStatusProps {
    status: string;
    balanca: string;
}

const StatusCarga = () => {
    const { status } = useLocalSearchParams();
    const { user } = useContext(AuthContext);
    const [modalInfo, setModalInfo] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [listStatus, setListStatus] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [infoCarga, setInfoCarga] = useState<any>([]);
    const [statusCarga, setStatusCarga] = useState<any>([]);

    const handleInfoCarga = (option: any) => {
        setModalInfo(true);
        setInfoCarga(option);
    };

    const handleStatusCarga = (option: any) => {
        setModalStatus(true);
        setStatusCarga(option);
    };

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

    const NameStatusCarga = (status: any) => {
        switch (status) {
            case "1":
                return "Informar nota";
            case "2":
                return "Entrada";
            case "3":
                return "Saída";
        }
    };

    const ModalInfoCarga = () => {
        return (
            <Modal
                statusBarTranslucent
                animationType="fade"
                transparent={true}
                visible={modalInfo}
            >
                <View className="flex-1 items-center justify-center bg-[#11204b73]">
                    <View className="m-5 py-[5px] bg-gray-200 rounded-md border-2 border-white z-10" style={{ width: WIDTH - 50 }}>
                        <View className="pb-2">
                            <TouchableOpacity onPress={() => setModalInfo(false)}>
                                <View className="flex-row items-center justify-between border-b border-b-gray-300">
                                    <Text className="py-2 px-4 text-xl text-solar-blue-dark font-Poppins_500Medium">
                                        Detalhes da carga
                                    </Text>
                                    <MaterialIcons name="close" size={30} color="#FAA335" />
                                </View>
                            </TouchableOpacity>
                            <View className="flex-col items-start justify-start py-4 w-full">
                                <Text> {infoCarga.codigo}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const ModalStatusCarga = () => {
        const [pesoCarga, setPesoCarga] = useState<string>('');
        const [loadingBalanca, setLoadingBalanca] = useState<boolean>(false);

        const onsubmit = async (values: RegisterStatusProps) => {
            console.log(values);
            setModalStatus(false);
        }

        const getPesoCarga = async () => {
            setLoadingBalanca(true);
            setPesoCarga('Aguarde processando...');
            await serviceportaria.post('(PORT_CAPTURA_PESO)', {
                caller: 0,
                filial: 26
            })
                .then((response) => {
                    const { peso } = response.data.peso;
                    setPesoCarga(`${peso}`);
                    setLoadingBalanca(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return (
            <Modal
                statusBarTranslucent
                animationType="fade"
                transparent={true}
                visible={modalStatus}
            >
                <View className="flex-1 items-center justify-center bg-[#11204b73]">
                    <View className="m-5 py-[5px] bg-gray-200 rounded-md border-2 border-white z-10" style={{ width: WIDTH - 50 }}>
                        <View className="pb-2">
                            <TouchableOpacity onPress={() => setModalStatus(false)}>
                                <View className="flex-row items-center justify-between border-b border-b-gray-300">
                                    <Text className="py-2 px-4 text-xl text-solar-blue-dark font-Poppins_500Medium">
                                        Alterar status da carga com placa {statusCarga.placa}
                                    </Text>
                                    <MaterialIcons name="close" size={30} color="#F18800" />
                                </View>
                            </TouchableOpacity>
                            <View className="flex-col items-start justify-start py-4 w-full">
                                <View className="px-4 w-full">
                                    <Formik
                                        enableReinitialize
                                        validationSchema={
                                            Yup.object().shape({
                                                balanca: Yup.string().required("O peso da carga é obrigatório, se não foi inserido faça manulamente!")
                                            })}
                                        initialValues={{
                                            codigo: statusCarga.codigo,
                                            balanca: pesoCarga,
                                            status: status === '3' ? '2' : '1'
                                        }}
                                        onSubmit={onsubmit}
                                    >
                                        {({
                                            handleChange,
                                            handleSubmit,
                                            setFieldTouched,
                                            values,
                                            isValid,
                                            touched,
                                            errors
                                        }) => (
                                            <View className="">
                                                <View className="">
                                                    <Text className="label-form">Peso da carga</Text>
                                                    <View className="flex-row items-center justify-start input-form">
                                                        <View className="flex-1">
                                                            <TextInput
                                                                className={``}
                                                                onChangeText={handleChange("balanca")}
                                                                onBlur={() => setFieldTouched("balanca")}
                                                                value={values.balanca}
                                                                autoCapitalize="characters"
                                                            />
                                                        </View>
                                                        <View className="">
                                                            {loadingBalanca
                                                                ? <ActivityIndicator size="small" color="#F18800" />
                                                                : <MaterialCommunityIcons name="scale" size={25} color="#F18800" onPress={getPesoCarga} />
                                                            }
                                                        </View>
                                                    </View>
                                                    {touched && errors && (
                                                        <Text className="self-start pl-6 pt-1 text-base text-red-600">
                                                            {errors.balanca}
                                                        </Text>
                                                    )}
                                                </View>
                                                <View className="mt-6">
                                                    <Pressable
                                                        className={`flex items-center justify-center ${!isValid
                                                            ? "bg-solar-gray-dark"
                                                            : "bg-solar-yellow-dark"
                                                            } mt-10 py-4 rounded-full`}
                                                        onPress={handleSubmit as any}
                                                    >
                                                        <Text
                                                            className={`text-xl font-medium ${!isValid ? "text-gray-300" : "text-solar-gray-light"
                                                                }`}
                                                        >
                                                            Confirmar {status === '3' ? 'saída' : 'entrada'}
                                                        </Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        )}
                                    </Formik>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <>
            <Loading visible={loading} spinercolor="#F18800" />
            <ModalInfoCarga />
            <ModalStatusCarga />
            <View className={`border-t-4 ${status === '1' ? 'border-green-500' : status === '2' ? 'border-orange-500' : 'border-blue-500'}`}>
                <View className={`flex-col items-start justify-center border-b border-b-gray-300 py-2 mb-4`}>
                    <Text className="text-lg uppercase text-solar-blue-dark font-semibold">
                        Cargas aguardando {NameStatusCarga(status)}
                    </Text>
                </View>
                <View className="p-1 bg-white border-gray-300 rounded-md">
                    <View className="bg-gray-100 flex-row items-center justify-start border-y border-x border-gray-300">
                        <MaterialCommunityIcons name="information" size={28} color={'#f1f1f1'} />
                        <Text className="pl-1 w-16 px-1 py-3 border-r border-gray-300 text-base font-medium">
                            Código
                        </Text>
                        <Text className="pl-1 w-16 py-3 border-r border-gray-300 text-base font-medium">
                            Pager
                        </Text>
                        <Text className="pl-1 w-24 py-3 border-r border-gray-300 text-base font-medium">
                            Placa
                        </Text>
                        <Text className="pl-1 w-44 py-3 border-r border-gray-300 text-base font-medium">
                            Produto
                        </Text>
                        <Text className="pl-1 py-3 text-base font-medium">Data/Hora</Text>
                        <Text></Text>
                    </View>
                    {listStatus &&
                        listStatus.map((list: any, idx: number) => (
                            <View
                                key={idx}
                                className={`${idx % 2 ? "bg-blue-50" : "bg-gray-50"
                                    } flex-row items-center justify-start border-b border-x border-gray-300`}
                            >
                                <MaterialCommunityIcons name="information" size={28} color={'#17A2B8'} onPress={() => handleInfoCarga(list)} />
                                <Text className="pl-1 w-16 px-1 py-3 border-r border-gray-300 text-base font-normal">
                                    {list.codigo}
                                </Text>
                                <Text className="pl-1 w-16 py-3 border-r border-gray-300 px-1 text-base font-normal">
                                    {list.pager}
                                </Text>
                                <Text className="pl-1 w-24 py-3 border-r border-gray-300 text-base font-normal">
                                    {list.placa}
                                </Text>
                                <Text className="pl-1 w-44 py-3 border-r border-gray-300 text-base font-normal">
                                    {list.produto}
                                </Text>
                                <Text className="pl-1 w-44 mr-1 text-base font-normal">
                                    {list.dhChegada}
                                </Text>
                                <View className="flex-row items-center justify-end">
                                    {status === '3'
                                        ? <MaterialCommunityIcons name="arrow-right-bold-box" size={28} color={'#2085d8'} onPress={() => handleStatusCarga(list)} />
                                        : <MaterialCommunityIcons name="arrow-left-bold-box" size={28} color={'#F18800'} onPress={() => handleStatusCarga(list)} />
                                    }
                                </View>
                            </View>
                        ))}
                </View>
            </View>
        </>
    );
};

export default StatusCarga;
