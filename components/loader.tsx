import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

type SpinnerLoaderProps = {
  size?: "small" | "large";
  color?: string;
  message?: string;
  customClass?: string;
};

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  size = "large",
  color = "#ffffff",
  message,
  customClass = "",
}) => {
  return (
    <View className={`flex items-center justify-center ${customClass}`}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text className="mt-2 text-white text-sm font-medium">{message}</Text>
      )}
    </View>
  );
};

export default SpinnerLoader;
