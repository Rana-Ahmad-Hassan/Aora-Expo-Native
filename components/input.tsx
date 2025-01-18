import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps {
  label: string;
  inputType: "text" | "email" | "password" | "number" | "file";
  onChange: (value: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, inputType, onChange, icon, placeholder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getKeyboardType = (type: InputProps["inputType"]) => {
    switch (type) {
      case "email":
        return "email-address";
      case "number":
        return "numeric";
      default:
        return "default";
    }
  };

  return (
    <View className="my-3">
      <Text className="text-gray-100 mb-2 text-xl">{label}</Text>
      <View className="flex-row items-center bg-[#1E1E2D] border border-primary rounded-md px-3 h-16">
        {icon && (
          <Ionicons
            name={icon}
            size={24}
            className="text-primary mr-3"
          />
        )}
        <TextInput
          className="flex-1 text-white text-lg placeholder-gray-400"
          secureTextEntry={inputType === "password" && !isPasswordVisible}
          keyboardType={getKeyboardType(inputType)}
          onChangeText={onChange}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          placeholderTextColor="#FFFFFF"
        />
        {inputType === "password" && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
              className="text-primary"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
