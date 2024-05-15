// Impor fungsi yang diperlukan dari SDK yang diperlukan

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebaseConfig'; // Mengimpor konfigurasi Firebase dari file firebaseConfig
import { query, limit } from "firebase/firestore";


// Inisialisasi Firebase

// Fungsi untuk mendapatkan data dari dokumen Firestore bernama 'blog_post' berdasarkan ID tertentu atau semua data jika tidak ada ID
const getDataBlogPost = async (blogId, limitCount) => {
  const q = query(collection(db, "blog_post"), limit(limitCount));
  const querySnapshot = await getDocs(q);
  const data = [];

  if (blogId) {
    querySnapshot.forEach((doc) => {
      if (doc.id === blogId) {
        data.push({
          id: doc.id,
          data: doc.data()
        });
      }
    });
  } else {
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        data: doc.data()
      });
    });
  }

  return data;
};
export default async function handler(req, res) {
  const { id, get, limit } = req.query;
  const blogData = await getDataBlogPost(id, get, parseInt(limit));
  res.status(200).json(blogData);
}