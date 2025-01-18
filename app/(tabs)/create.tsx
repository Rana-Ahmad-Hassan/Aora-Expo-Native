import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/input";
import * as DocumentPicker from "expo-document-picker";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ResizeMode, Video } from "expo-av";
import icons from "@/constants/icons";
import Button from "@/components/button";

interface DocumentPicker {
  title: string;
  video: any;
  thumbnail: any;
  prompt: string;
}

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<DocumentPicker>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="px-4">
          <Text className="text-white text-2xl font-psemibold my-10">
            Upload Video
          </Text>

          <Input
            label="Video Title"
            inputType="text"
            onChange={() => console.log("hey")}
          />

          <View className="mt-7 my-3">
            <Text className="text-base mb-3 text-gray-100 font-pmedium">
              Upload Video
            </Text>

            <TouchableOpacity onPress={() => openPicker("video")}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  className="w-full h-64 rounded-lg"
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              ) : (
                <View className="w-full h-40 px-4 bg-black-100 rounded-lg border border-black-200 flex justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-1/2 h-1/2"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className="mt-7 my-3">
            <Text className="text-base mb-3 text-gray-100 font-pmedium">
              Thumbnail Image
            </Text>

            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode="cover"
                  className="w-full h-64 rounded-lg"
                />
              ) : (
                <View className="w-full h-16 px-4 bg-black-100 rounded-lg border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Input
            label="AI prompt"
            inputType="text"
            onChange={() => console.log("hey")}
          />

          <Button
            title="Submit & Publish"
            onPress={() => console.log("button press")}
            customClasses="w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
