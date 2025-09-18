import { ROUTES } from "@/constants/routes";
import { useSignIn } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StatusBar,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SendResetCode() {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function sendCode() {
    if (!isLoaded) return;
    setLoading(true);
    setErr(null);
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: email.trim(),
      });
      router.push(ROUTES.forgotPasswordVerify);
    } catch (e: any) {
      setErr(e?.errors?.[0]?.longMessage || "Nepodarilo sa odoslať kód.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 12 }}>
        Reset hesla
      </Text>
      <TextInput
        placeholder="Tvoj e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />
      <Button
        title={loading ? "Posielam..." : "Poslať kód"}
        onPress={sendCode}
      />
      {(!isLoaded || loading) && (
        <ActivityIndicator style={{ marginTop: 12 }} />
      )}
      {err && <Text style={{ color: "red", marginTop: 12 }}>{err}</Text>}
    </SafeAreaView>
  );
}
