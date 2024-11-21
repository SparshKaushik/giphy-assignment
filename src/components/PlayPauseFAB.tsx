import { StyleSheet, TouchableNativeFeedback } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { HomePageGifState, useHomePageGifState } from "@/lib/states";
import { View } from "./ui/Themed";

export function PlayPauseFAB() {
  const colorScheme = useColorScheme();
  const state = useHomePageGifState();
  return (
    <TouchableNativeFeedback onPress={() => state.toggleState()}>
      <View
        style={[
          styles.button,
          { backgroundColor: Colors[colorScheme].elevatedBackground },
        ]}
      >
        <Feather
          name={state.state === HomePageGifState.Play ? "pause" : "play"}
          size={24}
          color={Colors[colorScheme].text}
        />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 8,
    right: 10,
    zIndex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: 48,
    height: 48,

    borderRadius: 12,
  },
});
