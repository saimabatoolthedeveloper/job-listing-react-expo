import { FlatList } from "react-native";
import JobItem from "./JobItem";
import { Job } from "../types/types";

type Props = {
  jobs: Job[];
};

export default function JobList({ jobs }: Props) {
  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <JobItem job={item} />}
    />
  );
}
