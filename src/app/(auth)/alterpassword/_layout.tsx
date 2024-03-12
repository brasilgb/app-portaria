import React from "react";
import { Stack } from "expo-router";

const AlterPasswordRoot = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        presentation: 'modal',
        animationTypeForReplace: 'push',
        animation: 'slide_from_left',
        // animationDuration: 5000
      }}
    />
  );
};

export default AlterPasswordRoot;