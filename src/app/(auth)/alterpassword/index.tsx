import { View, Text, Image, TextInput, Pressable, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from "@/contexts/auth";
import { Formik } from "formik";
import schema from "./schema";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

interface AlterPasswordProps {
    password: string;
    password2: string;
    password3: string;
}

const AlterPassword = () => {
    const [loading, setLoading] = useState(false);
    const { user, alterPassword } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const onsubmit = async (values: AlterPasswordProps) => {
        await alterPassword(values, user);
    };

    return (
        <View className={`flex-1 pt-16 ${user?.filial === "1" ? 'bg-solar-blue-dark' : 'bg-solar-yellow-dark'} `}>
            <KeyboardAvoidingView behavior={undefined} keyboardVerticalOffset={0}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-col items-center justify-center">
                        <View className="py-8">
                            <Image
                                source={require("../../../../assets/logo-solar.png")}
                                className="w-[320px] h-[116px]"
                            />
                        </View>
                        <Formik
                            validationSchema={schema}
                            initialValues={{
                                password: "",
                                password2: "",
                                password3: ""
                            }}
                            enableReinitialize
                            onSubmit={onsubmit}
                        >
                            {({
                                handleChange,
                                handleSubmit,
                                setFieldTouched,
                                values,
                                touched,
                                errors,
                                isValid,
                            }) => (
                                <View className="bg-gray-200 px-8 pt-6 w-10/12 rounded">
                                    <View>
                                        <MaterialCommunityIcons name="arrow-left-bold-circle" size={32} color="#374151" onPress={() => router.back()} />
                                    </View>
                                    <View className="mt-6 relative">
                                        <Text className="label-form">Senha atual</Text>
                                        <TextInput
                                            className={`input-form ${touched && errors.password && 'border border-red-600'}`}
                                            onChangeText={handleChange("password")}
                                            onBlur={() => setFieldTouched("password")}
                                            value={values.password}
                                            secureTextEntry={!showPassword ? true : false}
                                        />
                                        {touched && errors && (
                                            <Text className="self-end pr-6 pt-1 text-base text-red-600">
                                                {errors.password}
                                            </Text>
                                        )}
                                        {!showPassword ? (
                                            <Ionicons
                                                name="eye"
                                                size={32}
                                                color="#374151"
                                                className="absolute top-10 right-4"
                                                onPress={() => setShowPassword(!showPassword)}
                                            />
                                        ) : (
                                            <Ionicons
                                                name="eye-off"
                                                size={32}
                                                color="#374151"
                                                className="absolute top-10 right-4"
                                                onPress={() => setShowPassword(!showPassword)}
                                            />
                                        )}
                                    </View>

                                    <View className="mt-6 relative">
                                        <Text className="label-form">Nova senha</Text>
                                        <TextInput
                                            className={`input-form ${touched && errors.password2 && 'border border-red-600'}`}
                                            onChangeText={handleChange("password2")}
                                            onBlur={() => setFieldTouched("password2")}
                                            value={values.password2}
                                            secureTextEntry={!showPassword2 ? true : false}
                                        />
                                        {touched && errors && (
                                            <Text className="self-end pr-6 pt-1 text-base text-red-600">
                                                {errors.password2}
                                            </Text>
                                        )}
                                        {!showPassword2 ? (
                                            <Ionicons
                                                name="eye"
                                                size={32}
                                                color="#374151"
                                                className="absolute top-10 right-4"
                                                onPress={() => setShowPassword2(!showPassword2)}
                                            />
                                        ) : (
                                            <Ionicons
                                                name="eye-off"
                                                size={32}
                                                color="#374151"
                                                className="absolute top-10 right-4"
                                                onPress={() => setShowPassword2(!showPassword2)}
                                            />
                                        )}
                                    </View>

                                    <View className="mt-6 relative">
                                        <Text className="label-form">Repita a senha</Text>
                                        <TextInput
                                            className={`input-form ${touched && errors.password3 && 'border border-red-600'}`}
                                            onChangeText={handleChange("password3")}
                                            onBlur={() => setFieldTouched("password3")}
                                            value={values.password3}
                                            secureTextEntry={!showPassword3 ? true : false}
                                        />
                                        {touched && errors && (
                                            <Text className="self-end pr-6 pt-1 text-base text-red-600">
                                                {errors.password3}
                                            </Text>
                                        )}
                                        {!showPassword3 ? (
                                            <Ionicons
                                                name="eye"
                                                size={32}
                                                color="#374151"
                                                className="absolute top-10 right-4"
                                                onPress={() => setShowPassword3(!showPassword3)}
                                            />
                                        ) : (
                                            <Ionicons
                                                name="eye-off"
                                                size={32}
                                                color="#374151"
                                                className="absolute top-10 right-4"
                                                onPress={() => setShowPassword3(!showPassword3)}
                                            />
                                        )}
                                    </View>

                                    <Pressable
                                        className={`flex items-center justify-center ${!isValid
                                            ? "bg-solar-gray-dark"
                                            : `${user?.filial === '1' ? 'bg-solar-blue-dark text-4xl' : 'bg-solar-yellow-dark'}`
                                            } mt-10 py-4 rounded-full`}
                                        onPress={handleSubmit as any}
                                        disabled={user?.filial ? false : true}
                                    >
                                        <Text
                                            className={`text-xl font-medium ${!isValid || !user?.filial
                                                ? "text-gray-300"
                                                : `${user?.filial === '1' ? 'text-solar-gray-light text-4xl' : 'text-gray-700'}`
                                                }`}
                                        >
                                            Alterar senha
                                        </Text>
                                    </Pressable>
                                    <View className="items-center my-6">
                                        <Text className="text-sm text-gray-400 font-Poppins_500Medium">
                                            Grupo Solar - App Portaria v{process.env.EXPO_PUBLIC_APP_VERSION}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                    <StatusBar style="light" />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default AlterPassword;