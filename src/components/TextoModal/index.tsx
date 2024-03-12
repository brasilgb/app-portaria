import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface TextoModalProps {
    title: string;
    value: string;
}

const TextoModal = ({ title, value }: TextoModalProps) => {
    return (
        <View className="flex-row items-start justify-start px-4 w-full">
            <Text className="flex-1 text-lg p-2 border-b border-gray-300">{title}</Text>
            <Text className="flex-1 text-lg p-2 font-semibold border-b border-gray-300"> {value}</Text>
        </View>

    )
}

export default TextoModal;