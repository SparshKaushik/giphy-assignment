import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
export { ErrorBoundary } from "expo-router";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";

import QueryClientProvider from "@/components/QueryClientProvider";
import Colors from "@/constants/Colors";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { View } from "@/components/ui/Themed";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  NavigationBar.setBackgroundColorAsync(Colors[colorScheme].background);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider>
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <ThemeSwitcher />
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <Stack initialRouteName="index">
            <Stack.Screen
              name="index"
              options={{
                title: "Giphy",
                headerStyle: {
                  backgroundColor: Colors[colorScheme].background,
                },
                headerTitleStyle: {
                  fontFamily: "SpaceMono",
                  fontWeight: "bold",
                },
              }}
            />
          </Stack>
        </View>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
