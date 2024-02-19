import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";
import { router, usePathname } from "expo-router";

interface HeaderProps {
  textbottom: string;
  title: string;
  subtitle: string;
  textcolor: string;
  bgcolor: string;
  color: string;
}

const Header = ({
  textbottom,
  title,
  subtitle,
  textcolor,
  bgcolor,
  color,
}: HeaderProps) => {
  const { signOut } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <View className={`${bgcolor} flex-col items-center py-6`}>
      <View className="flex-row items-center justify-between py-2 px-4 w-full">
        {pathname === "/naturovos" || pathname === "/solar" ? (
          <Text />
        ) : (
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={color}
            onPress={() => router.back()}
          />
        )}

        <Ionicons
          name="log-out-outline"
          size={32}
          color={color}
          onPress={() => signOut()}
        />
      </View>
      <View className="flex-col items-center justify-center">
        {title && (
          <Text className={`${textcolor} text-3xl uppercase font-semibold`}>
            {title}
          </Text>
        )}
        <Text className={`${textcolor} text-2xl font-semibold`}>
          {subtitle}
        </Text>
        <View className="mt-3 border-t border-t-white w-2/3 py-1" />
        <Text className={`${textcolor} text-xl`}>{textbottom}</Text>
      </View>
    </View>
  );
};

export default Header;
