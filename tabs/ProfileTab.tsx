import React from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

const ProfileTab: React.FC = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Firebase'den çıkış yap
    const auth = getAuth();
    await signOut(auth);

    // AsyncStorage'deki oturum bilgilerini temizle
    await AsyncStorage.removeItem("loggedInUser");

    // Giriş ekranına yönlendir
    navigation.navigate("Login" as never);
  };
  return (
    <View style={{alignItems: "center", justifyContent:"center", flex:1}}>
      {/* Profil içeriği */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileTab;
