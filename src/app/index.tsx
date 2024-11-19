import Colors from "@/constants/Colors";
import { useTrendingGIFsQuery } from "@/lib/models/trending";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const gifs = useTrendingGIFsQuery({
    params: {
      limit: 10,
    },
  });

  useEffect(() => {}, [gifs]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: Colors.dark.text,
        }}
      >
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
