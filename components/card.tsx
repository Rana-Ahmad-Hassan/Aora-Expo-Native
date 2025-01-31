import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import Icons from "../constants/icons";

const Card = ({ posts }: any) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    if (playingIndex !== index) {
      setPlayingIndex(index);
    } else {
      setPlayingIndex(null);
    }
  };

  return (
    <>
      {posts?.map((item: any, i: number) => {
        return (
          <View key={i} className="flex-1 items-center justify-center my-6">
            <View className="w-full rounded-lg shadow-lg py-3 h-full">
              <View className="flex-row items-center justify-between">
                <Image
                  source={{
                    uri: item.user?.avatar,
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
                <View
                  className="w-full h-60 rounded-xl mt-3 relative"
                  style={{ width: "100%", height: 240 }} 
                >
                  {playingIndex === i ? (
                    <Video
                      source={{
                        uri: item?.video,
                      }}
                      className="rounded-xl"
                      style={{ width: "100%", height: "100%" }}
                      resizeMode={ResizeMode.COVER}
                      useNativeControls
                      shouldPlay
                      onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                        if (status.didJustFinish) {
                          setPlayingIndex(null);
                        }
                      }}
                    />
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handlePlay(i)}
                      className="w-full h-full rounded-xl flex justify-center items-center"
                    >
                      <Image
                        source={{ uri: item.thumbnail }}
                        className="w-full h-full rounded-xl"
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
          </View>
        );
      })}
    </>
  );
};

export default Card;
