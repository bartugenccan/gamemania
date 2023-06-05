import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { Input, Button } from "@rneui/base";
import ApiService from "../../services/ApiService";
import Game from "../../types/Game";
import SingleSearchedGame from "../../components/SingleSearchedGame/SingleSearchedGame";

const SearchTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    setSearchQuery("");
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      // If search term is empty, clear search results
      setSearchResults([]);
      return;
    }
    try {
      setIsLoading(true); // Start loading
      const results = await ApiService.fetchSearchedGames(
        searchQuery.toLowerCase()
      );
      setSearchResults(results);
      setSearchQuery("");
    } catch (error) {
      console.log("Failed to fetch searched games:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <Input
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Search for games..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        inputStyle={{ color: "#fff", borderRadius: 10, paddingHorizontal: 10 }}
      />
      <Button
        title="Search"
        onPress={handleSearch}
        style={{
          width: "30%",
          alignSelf: "center",
          borderRadius: 18,
          marginBottom: 22,
        }}
        color={"success"}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SingleSearchedGame game={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchTab;
