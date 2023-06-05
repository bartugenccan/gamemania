import React from "react";
import { View } from "react-native";
import AnimatedLottieView from "lottie-react-native";

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ borderRadius: 50 }}>
        <AnimatedLottieView
          source={require("../../animations/102371-gamer.json")}
          style={{ width: "100%", height: "100%" }}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default LoadingScreen;
