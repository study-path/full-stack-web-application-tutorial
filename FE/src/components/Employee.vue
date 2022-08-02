<template>
  <div class="title">Employee Management Portal</div>
  <div>
    <button
      type="button"
      data-toggle="modal"
      data-target="#EmployeeModal"
      class="btn btn-primary m-2 float-end"
      @click="addEmployee()"
    >
      Add Employee
    </button>
  </div>
  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>Employee name</th>
        <th>Department</th>
        <th>Date Of Joining</th>
        <th>PhotoFileName</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="employee in employees" :key="employee.id">
        <td>{{ employee.EmployeeId }}</td>
        <td>{{ employee.EmployeeName }}</td>
        <td>{{ employee.Department }}</td>
        <td>{{ employee.DateOfJoining }}</td>
        <td>{{ employee.PhotoFileName }}</td>
        <td>
          <button
            type="button"
            data-toggle="modal"
            data-target="#EmployeeModal"
            class="btn btn-primary m-2 float-end"
            @click="editEmployee(employee)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              />
            </svg>
          </button>
        </td>
        <td>
          <button
            class="btn btn-light"
            @click="deleteEmployee(employee.EmployeeId)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="modal" tabindex="-1" role="dialog" id="EmployeeModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="department-add-modal-label">
            {{ modalTitle }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-row bd-highlight mb-3">
            <div class="p-2 w-50 bd-highlight">
              <div class="input-group mb-3">
                <span class="input-group-text">Name</span>
                <input
                  type="text"
                  class="form-control"
                  v-model="employeeName"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Department </span>
                <select class="form-select" v-model="department">
                  <option v-for="dep in departments" :key="dep.DepartmentId">
                    {{ dep.DepartmentName }}
                  </option>
                </select>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">DOJ </span>
                <input
                  type="date"
                  class="form-control"
                  v-model="dateOfJoining"
                />
              </div>
            </div>
            <div class="p-2 w-50 bd-highlight">
              <img :src="photoPath + photoFileName" alt="Photo" />
              <input type="file" class="m-2" @change="imageUpload" />
            </div>
          </div>

          <button
            type="button"
            v-if="employeeId == 0"
            class="btn btn-primary"
            @click="createEmployee()"
            data-dismiss="modal"
          >
            Create
          </button>
          <button
            type="button"
            v-if="employeeId != 0"
            class="btn btn-primary"
            @click="updateEmployee()"
            data-dismiss="modal"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      modalTitle: "",
      employees: [],
      employeeName: "",
      employeeId: 0,
      departments: [],
      department: "",
      dateOfJoining: "",
      photoFileName: "anonymous.png",
      photoPath: "https://localhost:44319/photos/",
    };
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      const instance = axios.create({
        baseURL: "https://localhost:44319",
      });

      instance
        .get("/api/employee")
        .then((response) => {
          this.employees = response.data;
        })
        .catch((err) => {
          err;
        });

      instance.get("/api/department").then((response) => {
        this.departments = response.data;
      });
    },
    addEmployee() {
      this.modalTitle = "Add Employee";
      this.employeeId = 0;
      this.employeeName = "";
      this.department = "";
      this.dateOfJoining = "";
      this.photoFileName = "anonymous.png";
    },
    editEmployee(emp) {
      this.modalTitle = "Edit Employee";
      this.employeeId = emp.EmployeeId;
      this.employeeName = emp.EmployeeName;
      this.department = emp.Department;
      this.dateOfJoining = emp.DateOfJoining;
      this.photoFileName = emp.PhotoFileName;
    },
    createEmployee() {
      const instance = axios.create({ baseURL: "https://localhost:44319" });

      instance
        .post("/api/employee", {
          EmployeeName: this.employeeName,
          Department: this.department,
          DateOfJoining: this.dateOfJoining,
          PhotoFileName: this.photoFileName,
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        })
        .catch((err) => {
          err;
        });
    },
    updateEmployee() {
      const instance = axios.create({ baseURL: "https://localhost:44319" });
      instance
        .put("/api/employee", {
          EmployeeId: this.employeeId,
          EmployeeName: this.employeeName,
          Department: this.department,
          DateOfJoining: this.dateOfJoining,
          PhotoFileName: this.photoFileName,
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        })
        .catch((err) => {
          err;
        });
    },
    deleteEmployee(id) {
      if (!confirm("Are you sure?")) {
        return;
      }
      const instance = axios.create({
        baseURL: "https://localhost:44319",
      });

      instance
        .delete(`/api/employee/${id}`)
        .then((response) => {
          this.refreshData();
          alert(response.data);
        })
        .catch((err) => {
          err;
        });
    },
    imageUpload(event) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const instance = axios.create({
        baseURL: "https://localhost:44319",
      });

      instance.post("/api/employee/SaveFile", formData).then((response) => {
        this.photoFileName = response.data;
      });
    },
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 99%;
  margin: 5px;
}

td,
th {
  border: 1px solid #dddddd;
  padding: 15px;
}

tr:nth-child(even) {
  background-color: #dddddd;
  margin: 5px;
}
img {
  width: 225px;
  height: 225px;
}
.title {
  font-size: large;
  text-shadow: 1px 1px;
}
</style>
