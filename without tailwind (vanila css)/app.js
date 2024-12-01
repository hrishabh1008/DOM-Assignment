//selectiong DOM Elements
const form = document.getElementById("registration-form");
const studentRecords = document.getElementById("student-records");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Function to display students
function displayStudents() {
  studentRecords.innerHTML = "";
  students.forEach((student, index) => {
    createRow(student, index);
  });
}

// Function to create a row with animation
function createRow(student, index) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.id}</td>
    <td>${student.email}</td>
    <td>${student.contact}</td>
    <td>
      <button onclick="editStudent(${index})">Edit</button>
      <button onclick="deleteStudent(${index})">Delete</button>
    </td>
  `;

  // Apply initial styles for animation
  row.style.opacity = "0";
  row.style.transform = "scale(0.9)";

  // Append the row and apply animation
  studentRecords.appendChild(row);
  setTimeout(() => {
    row.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    row.style.opacity = "1";
    row.style.transform = "scale(1)";
  }, 50);
}

// Add Student
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("student-name").value;
  const id = document.getElementById("student-id").value;
  const email = document.getElementById("email-id").value;
  const contact = document.getElementById("contact-no").value;

  if (!name || !id || !email || !contact) {
    alert("All fields are required!");
    return;
  }

  const student = { name, id, email, contact };
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  createRow(student, students.length - 1);
  form.reset();
});

// Edit Student
function editStudent(index) {
  const student = students[index];
  document.getElementById("student-name").value = student.name;
  document.getElementById("student-id").value = student.id;
  document.getElementById("email-id").value = student.email;
  document.getElementById("contact-no").value = student.contact;

  deleteStudent(index);
}

// Delete Student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

// Initial display
displayStudents();
