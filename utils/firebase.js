import { firebaseConfig } from "../config/firebaseConfig";

const fetchFirestoreData = async (firebaseConfig) => {
  try {
    const firestoreData = await getFirestoreData(firebaseConfig);
    return firestoreData;
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return null;
  }
};

// Call the fetchFirestoreData function with the provided firebaseConfig
const firestoreData = await fetchFirestoreData(firebaseConfig);

