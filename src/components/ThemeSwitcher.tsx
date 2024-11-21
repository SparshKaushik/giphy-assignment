import { Appearance, StyleSheet, TouchableNativeFeedback } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { View } from "./ui/Themed";

export function ThemeSwitcher() {
  const colorScheme = useColorScheme();

  return (
    <TouchableNativeFeedback
      onPress={() =>
        Appearance.setColorScheme(colorScheme === "light" ? "dark" : "light")
      }
    >
      <View style={[styles.button]}>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: 48,
    height: 48,
  },
});
