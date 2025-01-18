import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../constants/images";
import Button from "@/components/button";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import Toast from "react-native-toast-message";

export default function Home() {
  const { isLogged, loading } = useGlobalContext();
  if (isLogged && !loading) return <Redirect href={"/(tabs)/home"} />;

  const array = [
    {
      source: Images.logo,
      width: 115,
      height: 34,
    },
    {
      source: Images.cards,
      width: 375,
      height: 298,
    },
  ];
  return (
    <SafeAreaView className="bg-primary h-full px-10 overflow-auto">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 items-center justify-center">
          {array.map((item, index) => (
            <Image
              key={index}
              source={item.source}
              resizeMode="contain"
              style={{ width: item.width, height: item.height }}
            />
          ))}
          <Text className="font-psemibold text-center text-white text-[30px]">
            Discover Endless Possibilities with{" "}
            <Text className="text-secondary">Aora</Text>
          </Text>
          <Text className=" text-gray-100 font-plight text-center py-5">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <Button
            title={"Continue with Email"}
            onPress={() => router.push("/(auth)/signIn")}
            customClasses="w-[387px]"
          />
        </View>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
}
