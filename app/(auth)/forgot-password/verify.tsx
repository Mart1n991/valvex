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

export default function VerifyCode() {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function verify() {
    if (!isLoaded) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code.trim(),
      });
      // Keď je kód správny, Clerk očakáva nové heslo:
      if ((res as any).status === "needs_new_password") {
        router.push(ROUTES.forgotPasswordNew);
      } else {
        setErr("Neočakávaný stav overenia. Skús znova.");
      }
    } catch (e: any) {
      setErr(
        e?.errors?.[0]?.longMessage || "Kód je nesprávny alebo expirovaný."
      );
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
        Overenie kódu
      </Text>
      <TextInput
        placeholder="Kód z e-mailu"
        value={code}
        onChangeText={setCode}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />
      <Button title={loading ? "Overujem..." : "Pokračovať"} onPress={verify} />
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {err && <Text style={{ color: "red", marginTop: 12 }}>{err}</Text>}
    </SafeAreaView>
  );
}
