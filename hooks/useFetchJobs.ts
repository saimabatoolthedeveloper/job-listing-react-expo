import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Job } from "../types/types";

const API_URL = "http://192.168.10.34:5000/api/jobs";

export default function useFetchJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("Fetching jobs...");

        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("No token found! User not authenticated.");
          return;
        }

        console.log("Token found:", token);

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Ensure correct format
          },
        });

        console.log("Jobs fetched successfully:", response.data);
        setJobs(response.data);

        // Store jobs locally for offline access
        await AsyncStorage.setItem("jobs", JSON.stringify(response.data));
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching jobs:", error.response?.data || error.message);
        } else if (error instanceof Error) {
          console.error("Error fetching jobs:", error.message);
        } else {
          console.error("Unknown error fetching jobs", error);
        }
      }
      
    };

    fetchJobs();
  }, []);

  return jobs;
}
