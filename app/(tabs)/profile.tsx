import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Icons from "../../constants/icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import Card from "@/components/card";
import EmptyState from "@/components/emptyState";
import { getUserPosts, signOut } from "@/lib/appWrite";
import { router } from "expo-router";
import useAppWrite from "@/hooks/useAppWrite";
import { Entypo } from "@expo/vector-icons";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";

const Profile = () => {
  const { user } = useGlobalContext();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    setPlayingIndex(index);
  };

  const handleLogout = () => {
    signOut();
    router.push("/");
  };

  const { data, loading } = useAppWrite({
    fn: () => getUserPosts(user?.accountId),
  });

  console.log("users created videos", data);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => (
          <View className="mb-4 mx-5 mt-10">
            <View className="w-full rounded-lg shadow-lg py-1">
              <View className="flex-row items-center justify-between">
                <Image
                  source={{
                    uri: item?.user?.avatar,
                  }}
                  className="w-14 h-14 rounded-lg"
                />
                <Text
                  className="text-white text-xl font-psemibold flex-1 ml-4"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.prompt}
                </Text>

                <TouchableOpacity>
                  <Entypo name="dots-three-vertical" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <View className="mt-4 relative">
                {playingIndex === index ? (
                  <Video
                    source={{
                      uri: item?.video,
                    }}
                    className=" rounded-xl mt-3"
                    style={{ width: "100%", height: "85%" }}
                    resizeMode={ResizeMode.COVER}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                      if (!status.isLoaded) {
                        setPlayingIndex(null);
                      }
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handlePlay(index)}
                    className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
                  >
                    <Image
                      source={{ uri: item.thumbnail }}
                      className="w-full h-full rounded-xl mt-3"
                      resizeMode="cover"
                    />

                    <Image
                      source={Icons.play}
                      className="w-12 h-12 absolute"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={() => (
          <>
            <View className="p-4 flex items-end">
              <TouchableOpacity onPress={handleLogout}>
                <Image
                  source={Icons.logout}
                  className="h-6 w-6"
                  resizeMode="contain"
                  accessibilityLabel="Logout Icon"
                />
              </TouchableOpacity>
            </View>

            <View className="flex items-center gap-y-4 mt-10">
              <Image
                source={Icons.profile}
                className="h-20 w-20 border border-secondary rounded-full p-2"
                resizeMode="contain"
                accessibilityLabel="User Profile Picture"
              />
              <Text className="text-white text-xl font-psemibold">
                {user?.username || "Guest"}
              </Text>
            </View>

            <View className="flex flex-row justify-center gap-16 mt-5">
              <View className="flex items-center">
                <Text className="text-white text-xl font-psemibold">10</Text>
                <Text className="text-white text-lg">Posts</Text>
              </View>
              <View className="flex items-center">
                <Text className="text-white text-xl font-psemibold">5</Text>
                <Text className="text-white text-lg">Views</Text>
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Video Created"
              subtitle="Create Your First Video"
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
