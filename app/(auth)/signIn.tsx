import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/input";
import Button from "@/components/button";
import Images from "../../constants/images";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appWrite";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { password, email } = form;
    if (!password || !email) {
      alert("All fields are required");
      return;
    }
    try {
      await signIn(email, password);
      router.replace("/home");
      Toast.show({
        text1: "Logged in successfully",
        type: "success",
        position: "top",
        topOffset: 20,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <SafeAreaView className="h-full bg-primary flex-1 justify-center items-center">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-full px-10">
          <Image
            source={Images.logo}
            style={{ width: 100, height: 40 }}
            resizeMode="contain"
          />

          <Text className="text-white text-2xl font-psemibold py-10">
            Sign in
          </Text>
          <Input
            label="Email"
            inputType="email"
            onChange={(value) => handleChange("email", value)}
          />
          <Input
            label="Password"
            inputType="password"
            onChange={(value) => handleChange("password", value)}
          />
          <Button
            title="Sign In"
            onPress={handleSubmit}
            customClasses="w-[387px]"
          />
          <Text className="text-gray-100 text-center text-lg py-5">
            Dont have an account?{" "}
            <Link href="/(auth)/signUp">
              <Text className="text-secondary font-psemibold">Signup</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
