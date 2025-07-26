// Import the functions you need from the SDKs you need
import  { initializeApp } from "firebase/app";
import  {  
          createUserWithEmailAndPassword,
          getAuth, 
          signInWithEmailAndPassword, 
          signOut
        } from "firebase/auth";
import  { 
          addDoc, 
          collection, 
          getFirestore 
        } from "firebase/firestore";  
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdQsl9vzOIR2NhoZuvqpPav36lPFWW7b8",
  authDomain: "netflix-clone-c17cb.firebaseapp.com",
  projectId: "netflix-clone-c17cb",
  storageBucket: "netflix-clone-c17cb.firebasestorage.app",
  messagingSenderId: "273216648424",
  appId: "1:273216648424:web:8abffeb993c66ac385455d"
};


const app = initializeApp(firebaseConfig); // Initialize Firebase
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

// User Signup Function
const signup = async (name, email, password) =>{
  try{
    const res = await createUserWithEmailAndPassword (auth, email, password); // Create user with email and password
    const user = res.user; // Get the user object
    await addDoc(collection(db, "users"), { // Add user data to Firestore
      uid: user.uid,
      name,
      authProvider: "local", 
      email
    })
  }catch (error){
    toast.error(error.code.split('/')[1].split('-').join(" ")); // Show error message using toast
  }
}

const login = async (email, password) => {
  try{
    await signInWithEmailAndPassword (auth, email, password) // Sign in with email and password
  }catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "), {
     toastId: "toastAvoidsDuplicates",
}); // Show error message using toast
  }
}

// User Logout Function
const logout = () => {
  signOut(auth) // Sign out the user
}

export { auth, db, signup, login, logout }; // Export auth, db, signup, login, and logout functions