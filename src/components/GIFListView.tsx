import { StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Image } from "expo-image";

import { GIFObject } from "@/lib/types/GIF";
import { ResponsiveGrid } from "./ResponsiveGrid";
import { MasonryFlashList } from "@shopify/flash-list";
import { View } from "./ui/Themed";

type GIFListViewProps = {
  data: GIFObject[];
  onEndReached?: () => void;
  endLoading?: boolean;
};

export function GIFListView({
  data,
  onEndReached,
  endLoading,
}: GIFListViewProps) {
  const renderItem = ({ item: gif }: { item: GIFObject }) => (
    <Image
      source={gif.images.fixed_width.url}
      style={[
        styles.image,
        {
          height: Number(gif.images.fixed_width.height),
          width: Number(gif.images.fixed_width.width),
        },
      ]}
      placeholder={{
        blurhash: "L6S$ovof~q-;IUWBt7j[-;t79FM{",
      }}
    />
  );

  return (
    <MasonryFlashList
      data={data}
      numColumns={2}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      estimatedItemSize={499}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      ListFooterComponent={() => (endLoading ? <ActivityIndicator /> : <></>)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "space-around",

    padding: "2%",
  },
  column: {
    gap: 8,
  },
  image: {
    borderRadius: 8,
    width: "100%",
    height: "100%",

    alignSelf: "center",
  },
});
