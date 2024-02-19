import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";

interface LoadingProps {
  visible: boolean;
  spinercolor: string;
}

const Loading = ({ visible, spinercolor }: LoadingProps) => {
  return (
    <Modal transparent visible={visible}>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={spinercolor} />
      </View>
    </Modal>
  );
};

export default Loading;