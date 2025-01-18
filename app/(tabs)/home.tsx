import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import ImageSlider from "@/components/imageSlider";
import SearchBar from "@/components/searchBar";
import Images from "../../constants/images";
import Card from "@/components/card";
import { useGlobalContext } from "@/context/GlobalProvider";
import { getAllPosts, getLatestPost } from "@/lib/appWrite";
import useAppWrite from "@/hooks/useAppWrite";
import SpinnerLoader from "@/components/loader";
import { ResizeMode, Video } from "expo-av";


const Home: React.FC = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const {
    data: posts,
    loading,
    refetch,
  } = useAppWrite({
    fn: () => getAllPosts(),
  });

  const { data: latestPosts } = useAppWrite({
    fn: () => getLatestPost(),
  });

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="px-5">
          <View className="flex flex-row justify-between pt-10 items-center py-6">
            <View>
              <Text className="font-plight text-white text-xl">
                Welcome Back
              </Text>
              <Text className="text-white font-psemibold text-2xl">
                {user?.username || "Guest"}
              </Text>
            </View>
            <Image
              source={Images.logoSmall}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </View>
          <SearchBar />
          <Video
            source={{
              uri: "https://videos.pexels.com/video-files/3512495/3512495-sd_640_360_30fps.mp4",
            }}
            className="w-full h-[10vh] rounded-xl mt-3"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay={false}
          />
          {loading ? (
            <SpinnerLoader
              message="Fetching Trending...."
              size="large"
              color="#ffffff"
              customClass="h-[40vh]"
            />
          ) : posts && posts.length > 0 ? (
            <ImageSlider posts={latestPosts} loading={loading} />
          ) : (
            <Text className="text-center text-white py-4">
              No posts available. Try refreshing!
            </Text>
          )}
          {!loading && posts && posts.length > 0 && <Card posts={posts} />}
        </View>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
