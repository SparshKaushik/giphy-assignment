import { Appearance, StyleSheet, TouchableNativeFeedback } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { View } from "./ui/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";

export function ThemeSwitcher() {
  const colorScheme = useColorScheme();

  return (
    <TouchableNativeFeedback
      onPress={() =>
        Appearance.setColorScheme(colorScheme === "light" ? "dark" : "light")
      }
    >
      <View
        style={[
          styles.button,
          { backgroundColor: Colors[colorScheme].elevatedBackground },
        ]}
      >
        <Feather
          name={colorScheme === "light" ? "sun" : "moon"}
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
