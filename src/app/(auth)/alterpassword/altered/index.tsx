import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "@/contexts/auth";

const Registered = () => {
    const { user, disconnect } = useContext(AuthContext);
    return (
        <View className="flex-col items-center justify-center h-[80%]">
            <View className="flex-col items-center justify-center">
                <Ionicons name="checkmark-sharp" size={140} color="#F18800" />
            </View>
            <View className="flex-col items-center justify-center">
                <Text className="mt-10 font-medium text-4xl text-center text-gray-400">Senha alterada</Text>
                <Text className="mt-4 font-medium text-4xl text-center text-gray-400">com sucesso!</Text>
                <Text className="mt-1 font-medium text-[14px] text-center text-gray-500">para</Text>
                <Text className="mt-1 font-medium text-[18px] text-center text-gray-400">
                    {user?.nome}
                </Text>
                <Pressable
                    onPress={() => disconnect()}
                    className="flex items-center justify-center bg-solar-yellow-dark mt-6 py-4 px-12 rounded-full"
                >
                    <Text className="text-xl uppercase font-medium text-gray-700">Continuar</Text>
                </Pressable>
            </View>
            <StatusBar backgroundColor="#F1F1F1" style="dark" />
        </View>
    )
}

export default Registered;