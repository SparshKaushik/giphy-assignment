import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import IconButton from "@/components/ui/IconButton";
import { Text, View } from "@/components/ui/Themed";
import { useSearchQuery, useSearchSuggestionsQuery } from "@/lib/models/search";
import { GIFListView } from "@/components/GIFListView";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";

export default function Search() {
  const colorScheme = useColorScheme();

  const [searchText, setSearchText] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const router = useRouter();

  const search = useSearchQuery({
    params: {
      q: searchText,
    },
    options: {
      enabled: false,
    },
  });

  const searchSuggestions = useSearchSuggestionsQuery({
    params: {
      term: searchText,
    },
    options: {
      enabled: false,
    },
  });

  const handleTextChange = (text: string) => {
    setSearchText(text);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setDebounceTimeout(
      setTimeout(() => {
        handleSearch();
      }, 1000),
    );
  };

  const handleSearch = () => {
    search.refetch();
    searchSuggestions.refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleTextChange}
          placeholder="Search..."
          onSubmitEditing={handleSearch}
        />
        <IconButton
          icon="search"
          onPress={handleSearch}
          style={styles.searchButton}
          feedbackType="Opacity"
        />
      </View>

      {(searchSuggestions.data?.data.length ?? -1) > 0 && (
        <View>
          <FlatList
            data={searchSuggestions.data?.data}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={<View style={styles.spacer} />}
            renderItem={({ item: suggestion }) => (
              <TouchableOpacity
                style={[
                  styles.suggestionItem,
                  {
                    borderColor: Colors[colorScheme].elevatedBackground,
                  },
                ]}
                onPress={() => {
                  setSearchText(suggestion.name);
                  handleSearch();
                }}
              >
                <Text>{suggestion.name}</Text>
              </TouchableOpacity>
            )}
            horizontal
          />
        </View>
      )}
      <GIFListView
        data={search.data?.pages.flatMap((page) => page.data) ?? []}
        onEndReached={search.fetchNextPage}
        endLoading={search.isFetchingNextPage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  backButton: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  searchButton: {
    marginLeft: 8,
  },
  spacer: {
    width: 16,
    height: 1,
  },
  suggestionItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    borderRadius: 8,
    borderWidth: 1,

    marginRight: 8,

    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
