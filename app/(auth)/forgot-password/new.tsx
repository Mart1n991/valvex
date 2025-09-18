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

export default function SetNewPassword() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    if (!isLoaded) return;
    if (pwd.length < 8) return setErr("Heslo musí mať aspoň 8 znakov.");
    if (pwd !== pwd2) return setErr("Heslá sa nezhodujú.");
    setLoading(true);
    setErr(null);

    try {
      const res = await signIn!.resetPassword({
        password: pwd,
        // voliteľné: odhlásiť iné sessions
        // signOutOfOtherSessions: true,
      });

      if ((res as any).status === "complete") {
        await setActive!({ session: (res as any).createdSessionId });
        router.replace("/"); // dashboard
      } else {
        setErr("Neočakávaný stav po resete hesla.");
      }
    } catch (e: any) {
      setErr(e?.errors?.[0]?.longMessage || "Reset hesla zlyhal.");
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
        Nové heslo
      </Text>

      <TextInput
        placeholder="Nové heslo"
        secureTextEntry
        value={pwd}
        onChangeText={setPwd}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />
      <TextInput
        placeholder="Potvrď heslo"
        secureTextEntry
        value={pwd2}
        onChangeText={setPwd2}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <Button
        title={loading ? "Ukladám..." : "Nastaviť heslo"}
        onPress={submit}
      />
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {err && <Text style={{ color: "red", marginTop: 12 }}>{err}</Text>}
    </SafeAreaView>
  );
}
