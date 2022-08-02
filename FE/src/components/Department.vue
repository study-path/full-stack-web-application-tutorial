<template>
  <div>Departments</div>
  <div>
    <button
      type="button"
      data-toggle="modal"
      data-target="#DepartmentModal"
      class="btn btn-primary m-2 float-end"
      @click="addDepartment()"
    >
      Add Department
    </button>
  </div>

  <table>
    <thead>
      <tr>
        <th>
          <div class="d-flex flex-row">
            <input
              class="form-control m-2"
              v-model="departmentIdFilter"
              @keyup="filterFn()"
              name=""
              id=""
              placeholder="Filter"
            />
          </div>
          №
        </th>
        <th>
          <div class="d-flex flex-row">
            <input
              class="form-control m-2"
              v-model="departmentNameFilter"
              @keyup="filterFn()"
              name=""
              id=""
              placeholder="Filter"
            />
          </div>
          Department name
        </th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="department in departments" :key="department.id">
        <td>{{ department.DepartmentId }}</td>
        <td>{{ department.DepartmentName }}</td>
        <td>
          <button
            type="button"
            data-toggle="modal"
            data-target="#DepartmentModal"
            class="btn btn-primary m-2 float-end"
            @click="editDepartment(department)"
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
            @click="deleteDepartment(department.DepartmentId)"
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

  <div class="modal" tabindex="-1" role="dialog" id="DepartmentModal">
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
          <div class="input-group mb-3">
            <span class="input-group-text">Department Name </span>
            <input type="text" class="form-control" v-model="departmentName" />
          </div>
          <button
            type="button"
            v-if="departmentId == 0"
            class="btn btn-primary"
            @click="createDepartment()"
          >
            Create
          </button>
          <button
            type="button"
            v-if="departmentId != 0"
            class="btn btn-primary"
            @click="updateDepartment()"
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
      departments: [],
      modalTitle: "",
      departmentName: "",
      departmentId: 0,
      departmentNameFilter: "",
      departmentIdFilter: "",
      departmentsWithoutFilter: [],
    };
  },
  mounted() {
    this.getDepartments();
  },
  methods: {
    getDepartments() {
      const instance = axios.create({
        baseURL: "https://localhost:44319",
      });

      instance
        .get("/api/department")
        .then((response) => {
          this.departments = response.data;
          this.departmentsWithoutFilter = response.data;
        })
        .catch((err) => {
          err;
        });
    },
    addDepartment() {
      this.modalTitle = "Add Department";
      this.departmentId = 0;
      this.departmentName = "";
    },
    editDepartment(dep) {
      this.modalTitle = "Edit Department";
      this.departmentId = dep.DepartmentId;
      this.departmentName = dep.DepartmentName;
    },
    createDepartment() {
      const instance = axios.create({ baseURL: "https://localhost:44319" });

      instance
        .post("/api/department", { DepartmentName: this.departmentName })
        .then((response) => {
          this.getDepartments();
          alert(response.data);
        })
        .catch((err) => {
          err;
        });
    },
    updateDepartment() {
      const instance = axios.create({ baseURL: "https://localhost:44319" });
      instance
        .put("/api/department", {
          DepartmentId: this.departmentId,
          DepartmentName: this.departmentName,
        })
        .then((response) => {
          this.getDepartments();
          alert(response.data);
        })
        .catch((err) => {
          err;
        });
    },
    deleteDepartment(id) {
      if (!confirm("Are you sure?")) {
        return;
      }
      const instance = axios.create({
        baseURL: "https://localhost:44319",
      });

      instance
        .delete(`/api/department/${id}`)
        .then((response) => {
          this.getDepartments();
          alert(response.data);
        })
        .catch((err) => {
          err;
        });
    },
    filterFn() {
      var departIdFilter = this.departmentIdFilter;
      var departNameFilter = this.departmentNameFilter;

      this.departments = this.departmentsWithoutFilter.filter(function (el) {
        return (
          el.DepartmentId.toString()
            .toLowerCase()
            .includes(departIdFilter.toString().trim().toLowerCase()) &&
          el.DepartmentName.toString()
            .toLowerCase()
            .includes(departNameFilter.toString().trim().toLowerCase())
        );
      });
    },
  },
};
</script>

<style>
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
</style>
