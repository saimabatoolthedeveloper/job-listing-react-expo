import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useFetchJobs from "../../hooks/useFetchJobs";
import JobItem from "../../components/JobItem";
import { Job } from "../../types/types";  // Import Job type

export default function ExploreScreen() {
  const jobs = useFetchJobs();
  const router = useRouter();

  return (
    <View>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}  // Now TypeScript recognizes 'id'
        renderItem={({ item }: { item: Job }) => (  // Explicitly type 'item'
          <TouchableOpacity onPress={() => router.push(`/job/${item.id}`)}>
            <JobItem job={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
