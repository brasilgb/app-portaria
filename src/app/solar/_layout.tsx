import { View, Text } from 'react-native'
import React from 'react'
import { Slot } from "expo-router"
import { SafeAreaView } from 'react-native-safe-area-context';
import "./../../global.css";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/Header";
type Props = {}

const SolarLayout = (props: Props) => {
  return (
    <SafeAreaView className="flex-1">
      <Header
        title="Sistema de Gestão Integrada"
        subtitle="Controle de entrada e saída de visitantes"
        textbottom="Cadastro de visitantes Solar Matriz"
        textcolor="text-solar-gray-light"
        bgcolor="bg-solar-blue-light"
        color="#ffffff"
      />
      <View className="p-3">
        <Slot />
      </View>
      <StatusBar backgroundColor="#29ABE2" style="light" />
    </SafeAreaView>
  )
}

export default SolarLayout