import React from "react";
import Loading from "@/components/Loading";
import { View } from "react-native";

const index = () => {
  return (
      <View className="flex-1 bg-solar-blue-light">
        <Loading spinercolor="#FFD100" visible={true} />
      </View>
  );
};

export default index;
