import React, { useState } from "react";
import { View, Text, ScrollView, Image, Pressable, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/input";
import Button from "@/components/button";
import Images from "../../constants/images";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appWrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { username, password, email } = form;
    if (!username || !password || !email) {
      ToastAndroid.show("All fields are required", ToastAndroid.SHORT);
      return;
    }
    try {
      await createUser(email, password, username);
      router.replace("/home");
      alert("Account created successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary flex-1 justify-center items-center px-5">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-full">
          <Image
            source={Images.logo}
            style={{ width: 100, height: 40 }}
            resizeMode="contain"
          />

          <Text className="text-white text-2xl font-psemibold py-10">
            Sign up
          </Text>
          <Input
            label="Username"
            inputType="text"
            onChange={(value) => handleChange("username", value)}
          />
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
          <Button title="Sign Up" onPress={handleSubmit} customClasses="w-[387px]" />
          <Text className="text-gray-100 text-center text-lg py-5">
            Already have an account?{" "}
            <Link href="/(auth)/signIn" asChild>
              <Text className="text-secondary font-psemibold">Login</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
