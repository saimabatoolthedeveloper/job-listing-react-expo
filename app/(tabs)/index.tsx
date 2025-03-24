import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useFetchJobs from "../../hooks/useFetchJobs"; // ✅ Fetch jobs dynamically
import { Job } from "../../types/types"; // ✅ Import Job type

export default function HomeScreen() {
  const router = useRouter();
  const jobs = useFetchJobs(); // ✅ Get jobs from API

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Listings</Text>

      {jobs.length === 0 ? (
        <Text style={styles.noJobsText}>No jobs available. Try again later.</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Job }) => (
            <TouchableOpacity
              style={styles.jobItem}
              onPress={() => router.push(`/job/${item.id}`)} // ✅ Ensure correct path
            >
              <Text style={styles.jobTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  noJobsText: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
  jobItem: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});
