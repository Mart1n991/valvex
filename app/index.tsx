import { ROUTES } from "@/constants/routes";
import { SignedOut, useAuth } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const { isSignedIn } = useAuth();
  const insets = useSafeAreaInsets();

  if (isSignedIn) {
    return <Redirect href={ROUTES.dashboard} />;
  }

  return (
    <View style={{ padding: insets.top, paddingBottom: insets.bottom }}>
      <SignedOut>
        <Link href={ROUTES.signIn}>
          <Text>Sign in</Text>
        </Link>
        <Link href={ROUTES.signUp}>
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
