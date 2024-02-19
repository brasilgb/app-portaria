import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
interface ButtomProps {
  bgcolor: string;
  textcolor: string;
  title: string;
  icon: any;
  href: string;
  btnwidth: string;
  inverter?: boolean;
  params?: string;
}
export const ButtonAction = ({
  bgcolor,
  textcolor,
  title,
  icon,
  href,
  btnwidth,
  inverter,
  params,
}: ButtomProps) => {
  return (
    <Link
      className={`${bgcolor} ${textcolor} ${btnwidth} h-16 rounded text-xl flex-row items-center justify-center`}
      href={
        params
          ? {
              pathname: `${href}`,
              params: { status: params },
            }
          : href
      }
      // href={href}
      asChild
    >
      <Pressable>
        {!inverter && (
          <MaterialCommunityIcons name={icon} color="#FAFAFA" size={24} />
        )}
        <Text className={`${textcolor} mx-1 text-xl font-semibold`}>
          {title}
        </Text>
        {inverter && (
          <MaterialCommunityIcons name={icon} color="#FAFAFA" size={24} />
        )}
      </Pressable>
    </Link>
  );
};
