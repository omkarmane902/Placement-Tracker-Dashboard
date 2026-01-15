const BASE_URL = "https://placementstracker-4.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("cardContainer");
  const loader = document.getElementById("loader");
  const sectionTitle = document.getElementById("sectionTitle");

  
  function showLoader() {
    loader.style.display = "block";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  function resetUI(title) {
    sectionTitle.innerText = title;
    container.innerHTML = "";
    showLoader();
  }

  function formatArray(arr) {
    return Array.isArray(arr) && arr.length > 0 ? arr.join(", ") : "N/A";
  }


  function loadStudents() {
    resetUI("Students");

    fetch(`${BASE_URL}/students`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then(data => {
        hideLoader();

        data.forEach(s => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <h3>${s.personal_info?.full_name ?? "N/A"}</h3>
            <p><strong>ID:</strong> ${s.student_id}</p>
            <p><strong>Degree:</strong> ${s.academic_info?.degree}</p>
            <p><strong>Department:</strong> ${s.academic_info?.department}</p>

            <hr>

            <p><strong>Skills</strong></p>
            <p>💻 ${formatArray(s.skills?.programming)}</p>
            <p>🗄 ${formatArray(s.skills?.databases)}</p>
            <p>🛠 ${formatArray(s.skills?.tools)}</p>

            <span class="badge">${s.placement_status}</span>
          `;

          container.appendChild(card);
        });
      })
      .catch(err => {
        hideLoader();
        console.error(err);
        container.innerHTML = "<p style='color:red'>Failed to load students</p>";
      });
  }


  function loadColleges() {
    resetUI("Colleges");

    fetch(`${BASE_URL}/colleges`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch colleges");
        return res.json();
      })
      .then(data => {
        hideLoader();

        data.forEach(c => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <h3>${c.name ?? "College"}</h3>
            <p><strong>College ID:</strong> ${c.college_id ?? "N/A"}</p>
            <p><strong>Location:</strong> ${c.location.city ?? "N/A"}</p>
          `;

          container.appendChild(card);
        });
      })
      .catch(err => {
        hideLoader();
        console.error(err);
        container.innerHTML = "<p style='color:red'>Failed to load colleges</p>";
      });
  }


  function loadCompanies() {
    resetUI("Companies");

    fetch(`${BASE_URL}/companies`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch companies");
        return res.json();
      })
      .then(data => {
        hideLoader();

        data.forEach(c => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <h3>${c.name ?? "Company"}</h3>
            <p><strong>Company ID:</strong> ${c.company_id ?? "N/A"}</p>
            <p><strong>Industry:</strong> ${c.industry ?? "N/A"}</p>
          `;

          container.appendChild(card);
        });
      })
      .catch(err => {
        hideLoader();
        console.error(err);
        container.innerHTML = "<p style='color:red'>Failed to load companies</p>";
      });
  }


  function loadJobRoles() {
    resetUI("Job Roles");

    fetch(`${BASE_URL}/job-roles`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch job roles");
        return res.json();
      })
      .then(data => {
        hideLoader();

        data.forEach(j => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <h3>${j.title ?? "Job Role"}</h3>
            <p><strong>Job Role ID:</strong> ${j.role_id ?? "N/A"}</p>
          `;

          container.appendChild(card);
        });
      })
      .catch(err => {
        hideLoader();
        console.error(err);
        container.innerHTML = "<p style='color:red'>Failed to load job roles</p>";
      });
  }


  function showAddStudent() {
    hideLoader();
    sectionTitle.innerText = "Add Student";

    container.innerHTML = `
      <div class="form-card">
        <h3>Add New Student</h3>

        <input id="name" placeholder="Full Name">
        <input id="gender" placeholder="Gender">
        <input id="dob" type="date">

        <input id="collegeId" placeholder="College ID">
        <input id="department" placeholder="Department">
        <input id="degree" placeholder="Degree">
        <input id="year" placeholder="Graduation Year">
        <input id="cgpa" placeholder="CGPA">
        <input id="backlogs" placeholder="Backlogs">

        <input id="programming" placeholder="Programming (Java, C++)">
        <input id="databases" placeholder="Databases (MySQL)">
        <input id="tools" placeholder="Tools (Git, Docker)">

        <select id="status">
          <option value="Placed">Placed</option>
          <option value="Not Placed">Not Placed</option>
        </select>

        <button onclick="addStudent()">Create Student</button>
      </div>
    `;
  }


  function addStudent() {
    const student = {
      personal_info: {
        full_name: document.getElementById("name").value,
        gender: document.getElementById("gender").value,
        date_of_birth: document.getElementById("dob").value
      },
      academic_info: {
        college_id: document.getElementById("collegeId").value,
        department: document.getElementById("department").value,
        degree: document.getElementById("degree").value,
        graduation_year: Number(document.getElementById("year").value),
        cgpa: Number(document.getElementById("cgpa").value),
        backlogs: Number(document.getElementById("backlogs").value)
      },
      skills: {
        programming: document.getElementById("programming").value.split(",").map(s => s.trim()),
        databases: document.getElementById("databases").value.split(",").map(s => s.trim()),
        tools: document.getElementById("tools").value.split(",").map(s => s.trim())
      },
      placement_status: document.getElementById("status").value
    };

    fetch(`${BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add student");
        alert("Student added successfully!");
        loadStudents();
      })
      .catch(err => alert(err.message));
  }

  window.loadStudents = loadStudents;
  window.loadColleges = loadColleges;
  window.loadCompanies = loadCompanies;
  window.loadJobRoles = loadJobRoles;
  window.showAddStudent = showAddStudent;
  window.addStudent = addStudent;


  loadStudents();
});
