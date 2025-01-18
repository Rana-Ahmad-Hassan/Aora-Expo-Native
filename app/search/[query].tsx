import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../../constants/images";
import { useLocalSearchParams } from "expo-router";
import SearchBar from "@/components/searchBar";
import useAppWrite from "@/hooks/useAppWrite";
import { searchPosts } from "@/lib/appWrite";
import Card from "@/components/card";
import EmptyState from "@/components/emptyState";
import SpinnerLoader from "@/components/loader";

const Search = () => {
  const { query } = useLocalSearchParams();
  const {
    data: searchData,
    refetch,
    loading,
  } = useAppWrite({
    fn: () => searchPosts(query),
  });

  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query]);

  return (
    <SafeAreaView className="h-full bg-primary px-5">
      <ScrollView>
        <View className="flex flex-row justify-between pt-10 items-center py-6">
          <View>
            <Text className="font-plight text-white text-xl">
              Search Results
            </Text>
            <Text className="text-white font-psemibold text-2xl">{query}</Text>
          </View>
          <Image
            source={Images.logoSmall}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </View>
        <SearchBar />
        {loading ? (
          <SpinnerLoader message="Loading Posts" customClass="h-[40vh]" />
        ) : searchData?.length ? (
          <Card posts={searchData} />
        ) : (
          <EmptyState
            title={`No Post Found For ${query}`}
            subtitle="Search for another video.."
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
