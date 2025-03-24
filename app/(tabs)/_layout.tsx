import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="explore" options={{ title: "Explore Jobs" }} />
    </Tabs>
  );
}
