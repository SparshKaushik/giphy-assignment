import {
  StyleProp,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { View as ThemedView } from "./Themed";
import { View as DefaultView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import Colors from "@/constants/Colors";

const FeedbackTypes = {
  Native: TouchableNativeFeedback,
  Opacity: TouchableOpacity,
};

export default function IconButton({
  onPress,
  icon,
  size = 24,
  color,
  elevated,
  themed,
  feedbackType = "Native",
  disabled,
  style,
  ...props
}: {
  onPress: () => void;
  icon: string;
  size?: number;
  color?: string;
  elevated?: boolean;
  themed?: boolean;
  feedbackType?: keyof typeof FeedbackTypes;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const colorScheme = useColorScheme();

  const View = themed ? ThemedView : DefaultView;
  const Feedback = FeedbackTypes[feedbackType];

  return (
    <Feedback onPress={onPress} disabled={disabled} {...props}>
      <View
        style={[
          {
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: size / 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: elevated
              ? Colors[colorScheme].elevatedBackground
              : color,
          },
          style,
        ]}
      >
        {/* @ts-ignore */}
        <Feather name={icon} size={size} color={Colors[colorScheme].text} />
      </View>
    </Feedback>
  );
}
