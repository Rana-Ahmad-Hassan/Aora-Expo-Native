import React from "react";
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

const Profile = () => {
  const { user } = useGlobalContext();

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 mx-5 mt-10">
            <Card item={item} />
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
