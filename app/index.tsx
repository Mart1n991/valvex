import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Text, useColorScheme, View } from "react-native";

const Home = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  return (
    <View>
      <Text
        style={{
          color:
            colorScheme === "dark"
              ? DarkTheme.colors.text
              : DefaultTheme.colors.text,
        }}
      >
        {t("appName")}
      </Text>
      <Text
        style={{
          color:
            colorScheme === "dark"
              ? DarkTheme.colors.text
              : DefaultTheme.colors.text,
        }}
      >
        {t("welcome")}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
