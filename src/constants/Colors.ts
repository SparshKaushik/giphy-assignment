const colors = {
  tintColor: {
    light: "#2f95dc",
    dark: "#fff",
  },
};

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: colors.tintColor.light,
    tabIconDefault: "#ccc",
    tabIconSelected: colors.tintColor.dark,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: colors.tintColor.dark,
    tabIconDefault: "#ccc",
    tabIconSelected: colors.tintColor.light,
  },
};
