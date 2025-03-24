import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.10.34:5000/api/auth/login", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      router.replace("/(tabs)/explore"); // Navigate to job listing screen
    } catch (error) {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={{ marginTop: 10 }} onPress={() => router.push("/register" as any)}>
  Don't have an account? Register
</Text>
    </View>
  );
}
