import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ButtonProps {
  title: string;
  onPress: () => void;
  customClasses?: string
}
const Button: React.FC<ButtonProps> = ({ title, onPress, customClasses }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={`bg-secondary text-primary ${customClasses} h-[58px] rounded-md flex items-center justify-center`}>
        <Text className="text-lg font-psemibold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
