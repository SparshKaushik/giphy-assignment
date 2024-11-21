import { StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { MasonryFlashList } from "@shopify/flash-list";

import { GIFObject } from "@/lib/types/GIF";
import { HomePageGifState, useHomePageGifState } from "@/lib/states";
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
  const RenderItem = ({ item: gif }: { item: GIFObject }) => {
    const state = useHomePageGifState((s) => s.state);

    return (
      <Image
        source={
          gif.images[
            state === HomePageGifState.Play
              ? "fixed_width"
              : "fixed_width_still"
          ].url
        }
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
  };

  return (
    <MasonryFlashList
      data={data}
      numColumns={2}
      renderItem={({ item }) => <RenderItem item={item} />}
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
  image: {
    borderRadius: 8,
    width: "100%",
    height: "100%",

    alignSelf: "center",
  },
});
