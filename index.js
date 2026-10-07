// firebase.js
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCe7LpYI6HtyhmwPoxznmDBvvjXDkY8T5c",
  authDomain: "dk-letter-requesting.firebaseapp.com",
  databaseURL: "https://dk-letter-requesting-default-rtdb.asia-southeast1.firebasedatabase.app", // <-- important for Realtime DB
  projectId: "dk-letter-requesting",
  storageBucket: "dk-letter-requesting.appspot.com", // corrected bucket format
  messagingSenderId: "860956928159",
  appId: "1:860956928159:web:22dff145638e7f0b235aaa",
  measurementId: "G-HV1FNT9PP7"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ Handle form submit
document.getElementById("letterForm").addEventListener("submit", function(e){
  e.preventDefault();

  // Collect form data
  const name = e.target.name.value;
  const department = e.target.department.value;
  const problem = e.target.problem.value;
  const solution = e.target.reason.value;
  const date = e.target.date.value;

  // Create a unique entry in DB
  const requestsRef = ref(db, "letterRequests");
  const newRequestRef = push(requestsRef);

  set(newRequestRef, {
    studentName: name,
    department: department,
    problem: problem,
    solutionWanted: solution,
    requestDate: date,
    createdAt: new Date().toISOString()
  })
  .then(() => {
    alert("✅ Your Letter Request has been saved successfully!");
    e.target.reset(); // clear form
  })
  .catch((error) => {
    console.error("❌ Error saving request:", error);
    alert("Something went wrong. Please try again.");
  });
});
