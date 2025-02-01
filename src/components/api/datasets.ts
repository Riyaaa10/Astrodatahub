import { db } from '../../config/firebase';

import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc,
  orderBy,
  limit,
  startAfter,
  DocumentData
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Dataset } from '../api/types'; // Ensure this import is correct

export class DatasetService {
  private static COLLECTION_NAME = 'datasets';
  private static PAGE_SIZE = 10;

  static async searchDatasets(searchTerm: string = "", filterTag?: string, lastDoc?: DocumentData) {
    try {
      let baseQuery = collection(db, this.COLLECTION_NAME);
      let constraints: any[] = [];

      if (searchTerm) {
        constraints.push(where('name', '>=', searchTerm));
        constraints.push(where('name', '<=', searchTerm + '\uf8ff'));
        constraints.push(orderBy('name'));
      } else {
        constraints.push(orderBy('date', 'desc'));
      }

      if (filterTag) {
        constraints.push(where('tags', 'array-contains', filterTag));
      }

      if (lastDoc) {
        constraints.push(startAfter(lastDoc));
      }

      constraints.push(limit(this.PAGE_SIZE));

      const q = query(baseQuery, ...constraints);
      const snapshot = await getDocs(q);

      const datasets: Dataset[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Dataset[];

      return {
        datasets,
        lastDoc: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null
      };
    } catch (error) {
      console.error('Error searching datasets:', error);
      throw new Error("Failed to fetch datasets. Please try again.");
    }
  }

  static async uploadDataset(
    file: File,
    metadata: Omit<Dataset, 'id' | 'downloadUrl' | 'date'>
  ): Promise<Dataset> {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `datasets/${file.name}`);
      
      // Upload file
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadResult.ref);

      // Create dataset document
      const datasetData = {
        ...metadata,
        downloadUrl,
        date: new Date().toISOString(),
        fileSize: file.size,
        format: file.name.split('.').pop() || ''
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), datasetData);
      
      return {
        id: docRef.id,
        ...datasetData
      } as Dataset;
    } catch (error) {
      console.error('Error uploading dataset:', error);
      throw new Error("Dataset upload failed. Please try again.");
    }
  }

  static async getAllTags(): Promise<string[]> {
    try {
      const snapshot = await getDocs(collection(db, 'tags'));
      return snapshot.docs.map(doc => doc.data().name);
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw new Error("Failed to fetch tags.");
    }
  }
}
