import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { useTrendingGIFsQuery } from "@/lib/models/trending";
import { GIFListView } from "@/components/GIFListView";
import { View } from "@/components/ui/Themed";

export default function Index() {
  const gifs = useTrendingGIFsQuery({});

  useEffect(() => {}, [gifs]);

  return (
    <View style={styles.container}>
      <GIFListView
        data={gifs.data?.pages.flatMap((page) => page.data) ?? []}
        onEndReached={() => {
          gifs.fetchNextPage();
        }}
        endLoading={gifs.isFetchingNextPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
