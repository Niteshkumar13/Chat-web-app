import { initializeApp } from "firebase/app";
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId:import.meta.env.VITE_APP_PROJECTID,
  storageBucket:import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId:import.meta.env.VITE_APP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_APPID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const getURL = async ({ name, file }) => {
  const imageRef = ref(storage, `video/${name}/${new Date()}`);
  const x = await uploadBytesResumable(imageRef, file);
  const y = await getDownloadURL(x.ref);
  return y;
}