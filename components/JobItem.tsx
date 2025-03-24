import { View, Text, StyleSheet } from "react-native";
import { Job } from "../types/types"; // Import Job type

type Props = {
  job: Job;
};

export default function JobItem({ job }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.company}</Text>
      <Text style={styles.location}>{job.location}</Text>
      <Text style={styles.salary}>
        ${job.salary_from} - ${job.salary_to}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  company: {
    fontSize: 16,
    fontWeight: "500",
    color: "gray",
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
  salary: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 3,
  },
});
