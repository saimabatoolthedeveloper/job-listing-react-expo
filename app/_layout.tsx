import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) router.replace("/login");
    };
    checkLogin();
  }, []);

  return <Stack />;
}
