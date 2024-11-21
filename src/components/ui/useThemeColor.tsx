import Colors from "@/constants/Colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export default function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
