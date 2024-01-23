import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyApMnVkVMt3AdKZOK14-6Me75FyIv0iap4",
    authDomain: "registerhub-41c32.firebaseapp.com",
    projectId: "registerhub-41c32",
    storageBucket: "registerhub-41c32.appspot.com",
    messagingSenderId: "135033699324",
    appId: "1:135033699324:web:b5ce2fba481aa20d7e9079"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, database, storage };