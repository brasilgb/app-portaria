import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Slot } from "expo-router"
import "./../../global.css";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/Header";

const NaturovosLayout = () => {
  return (
    <SafeAreaView className="flex-1">
      <Header
        title="Sistema de Gestão Integrada"
        subtitle="Controle de entrada de carga"
        textbottom="Cadastro de cargas Naturovos"
        textcolor="text-gray-800"
        bgcolor="bg-solar-yellow-dark"
        color="#131212"
      />
      <View className="p-3">
        <Slot />
      </View>
      <StatusBar backgroundColor="#F18800" style="dark" />
    </SafeAreaView>
  )
}

export default NaturovosLayout