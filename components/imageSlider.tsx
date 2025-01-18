import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import { ResizeMode, Video, AVPlaybackStatus } from "expo-av";
import Icons from "../constants/icons";

const { width } = Dimensions.get("window");

type Post = {
  thumbnail: string;
  video: string;
};

type ImageSliderProps = {
  posts?: Post[] | null;
  loading: boolean;
};

const ImageSlider: React.FC<ImageSliderProps> = ({ posts, loading }) => {
  const [index, setIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  

  return (
    <>
      {loading ? (
        <View className="flex h-[50vh] items-center justify-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          <SafeAreaView className="flex items-center">
            {/* Header */}
            <View className="absolute left-3">
              <Text className="text-white top-10 text-lg font-light">
                Trending Videos
              </Text>
            </View>

            {/* Carousel */}
            <Carousel
              width={width}
              height={500}
              data={posts ?? []}
              scrollAnimationDuration={2000}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.8,
                parallaxScrollingOffset: 100,
                parallaxAdjacentItemScale: 0.7,
              }}
              onSnapToItem={(currentIndex) => {
                setIndex(currentIndex);
                if (playingIndex !== null) setPlayingIndex(null);
              }}
              renderItem={({ item, index }) => (
                <View key={item.video} className="relative">
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={{ width: "100%", height: "100%" }}
                    className=" rounded-[50px]"
                    resizeMode="cover"
                  />

                  {playingIndex !== index && (
                    <TouchableOpacity
                      className="absolute top-64 right-56"
                      onPress={() => setPlayingIndex(index)}
                    >
                      <Image
                        source={Icons.play}
                        className="w-12 h-12"
                        resizeMode="contain"
                        accessibilityLabel="Play Button"
                      />
                    </TouchableOpacity>
                  )}

                  {/* Video */}
                  {playingIndex === index && (
                    <View className="absolute w-full h-full z-50 flex justify-center items-center">
                      <Video
                        source={{ uri: item.video }}
                        style={{ width: "100%", height: "100%" }}
                        shouldPlay
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                          if (status.didJustFinish) {
                            setPlayingIndex(null);
                          }
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
            />

            {/*  Dots */}
            <View className="flex-row justify-center items-center mt-4">
              {posts?.map((_, i) => (
                <View
                  key={i}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    i === index ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default ImageSlider;
