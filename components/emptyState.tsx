import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import Button from "./button";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{subtitle}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>

      <Button
        title="Create Your First Video"
        onPress={() => router.push("/(tabs)/create")}
        customClasses="w-[387px]"
      />
    </View>
  );
};

export default EmptyState;
