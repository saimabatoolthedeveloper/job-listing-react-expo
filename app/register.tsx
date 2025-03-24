import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://192.168.10.34:5000/api/auth/register", {
        email,
        password,
      });
      Alert.alert("Success", "Registration successful! You can now log in.");
      router.replace("/login"); // Redirect to login
    } catch (error: any) {
      console.error("Registration Error:", error.response?.data || error.message);
      Alert.alert("Registration Failed", error.response?.data?.error || "Something went wrong");
    }
  };  

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
      <Text style={{ marginTop: 10 }} onPress={() => router.push("/login")}>
        Already have an account? Login
      </Text>
    </View>
  );
}
