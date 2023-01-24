// Import the functions you need from the SDKs you need
import {initializeApp} 
from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";

import {getDatabase, set, ref} 
from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

import {getAuth, createUserWithEmailAndPassword} 
from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";


import {firebaseConfig} from "./firebase.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const register_user = document.getElementById('register_user');


// register user function
const register_new_user = (e) => {
    e.preventDefault();

    const user_email = document.getElementById('user_email').value;
    const user_passwd = document.getElementById('user_passwd').value;

    createUserWithEmailAndPassword(auth, user_email, user_passwd)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(`new user created ${user}`)

    const loginTime = new Date();
    set(ref(database, 'users/' + user.uid), {
        email: user_email,
        role: "simple_user",
        timestamp : `${loginTime}`
      });
    
  })
  .catch((error) => {
      console.log(error);
  });

}

register_user.addEventListener('click', register_new_user);
