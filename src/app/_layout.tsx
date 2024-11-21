import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export { ErrorBoundary } from "expo-router";
import { Stack, router, usePathname } from "expo-router";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import QueryClientProvider from "@/components/QueryClientProvider";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { View } from "@/components/ui/Themed";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { StyleSheet } from "react-native";
import IconButton from "@/components/ui/IconButton";

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
        <View style={styles.container}>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <Stack
            initialRouteName="index"
            screenOptions={{
              headerRight: () => (
                <View style={styles.headerRightIcons}>
                  <IconButton
                    icon="search"
                    onPress={() => {
                      router.push("/search");
                    }}
                  />
                  <ThemeSwitcher />
                </View>
              ),
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors[colorScheme].background,
              },
              headerTitleStyle: {
                fontFamily: "SpaceMono",
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: "Giphy",
              }}
            />
            <Stack.Screen
              name="preview/[id]/index"
              options={{
                title: "GIF Preview",
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="search/index"
              options={{
                title: "Search",
                headerShown: false,
              }}
            />
          </Stack>
        </View>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  headerRightIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
