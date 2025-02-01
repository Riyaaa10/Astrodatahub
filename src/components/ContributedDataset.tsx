import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase"; // Ensure db is correctly imported

const fetchContributedDatasets = async () => {
  try {
    setLoading(true);

    const auth = getAuth();
    if (!auth.currentUser) {
      throw new Error("User is not authenticated.");
    }

    const datasetQuery = query(collection(db, "contributed_datasets"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(datasetQuery);

    const datasets = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setContributedDatasets(datasets);
  } catch (err) {
    console.error("Error fetching datasets: ", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
