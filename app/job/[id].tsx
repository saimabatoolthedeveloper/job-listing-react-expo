import { useLocalSearchParams } from "expo-router";
import { View, Text, Button, Linking, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Job } from "../../types/types";

export default function JobDetails() {
  const { id } = useLocalSearchParams();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      const jobs = await AsyncStorage.getItem("jobs");
      if (jobs) {
        const parsedJobs: Job[] = JSON.parse(jobs);
        const selectedJob = parsedJobs.find((j) => j.id === id);
        setJob(selectedJob || null);
      }
    };
    loadJob();
  }, [id]);

  if (!job) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.description}>{job.description}</Text>
        <View style={styles.details}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.value}>{job.company}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{job.location}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Salary:</Text>
          <Text style={styles.salary}>
            ${job.salary_from} - ${job.salary_to}
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Employment Type:</Text>
          <Text style={styles.value}>{job.employment_type}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Application Deadline:</Text>
          <Text style={styles.value}>{job.application_deadline}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Qualifications:</Text>
          {job.qualifications.map((qual, index) => (
            <Text key={index} style={styles.qualification}>
              • {qual}
            </Text>
          ))}
        </View>
        <Button
          title="Apply Now"
          color="#007bff"
          onPress={() => Linking.openURL(`mailto:${job.contact}`)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  details: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    width: 140, // Align labels
  },
  value: {
    fontSize: 16,
    color: "#666",
    flexShrink: 1,
  },
  salary: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  qualification: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});
