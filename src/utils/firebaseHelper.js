import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

// Save encrypted diary string
export async function saveDiaryToFirebase(encryptedText, userId = "guest") {
  const diariesRef = collection(db, "users", userId, "diaries");
  const docRef = await addDoc(diariesRef, {
    encryptedText,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

// Load diary by ID
export async function loadDiaryFromFirebase(diaryId, userId = "guest") {
  const diaryDoc = await getDoc(doc(db, "users", userId, "diaries", diaryId));
  if (diaryDoc.exists()) {
    return diaryDoc.data().encryptedText;
  } else {
    throw new Error("Diary not found");
  }
}
