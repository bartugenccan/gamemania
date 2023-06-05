import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Icons
import { Ionicons } from "@expo/vector-icons";

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 1,
    backgroundColor: "gray",
    padding:10,
    borderRadius: 50,
  },
});

export default BackButton;
