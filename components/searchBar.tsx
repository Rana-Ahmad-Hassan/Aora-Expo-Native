import React, { useState } from "react";
import {
  TextInput,
  View,
  TextInputProps,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useRouter, usePathname } from "expo-router"; // Corrected import
import { icons } from "@/constants";

const SearchBar: React.FC<TextInputProps> = (props) => {
  const [searchText, setSearchText] = useState("");
  const pathname = usePathname();
  const router = useRouter(); // Corrected usage

  return (
    <View className="flex-row items-center w-full px-4 py-5 bg-[#1E1E2D] rounded-lg">
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search..."
        placeholderTextColor="white"
        className="flex-1 text-white"
        {...props}
      />
      <TouchableOpacity
        onPress={() => {
          if (searchText === "") {
            Alert.alert(
              "Missing Query",
              "Please input something to search results across the database"
            );
            return;
          }

          if (pathname.startsWith(`/search/${searchText}`)) {
            router.setParams({ searchText }); // Use setParams for existing routes
          } else {
            router.push(`/search/${searchText}`); // Navigate to new route
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
