import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { listDepartments } from "../services/DepartmentService";

function EmployeeComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [departments]);

  const { id } = useParams();
  const navigator = useNavigate();

  const addEmployeeButton = (e) => {
    e.preventDefault(); // not worknig

    if (firstName == "" || lastName == "" || email == "" || departmentId == "")
      return alert("All fields are necessary!");
    if (!email.includes("@") || !email.includes("."))
      return alert("Enter a valid email address");

    const employee = {
      firstName,
      lastName,
      email,
      departmentId
    };
    id ? updateEmployee(id, employee) : createEmployee(employee);
    navigator("/employees");
  };

  function pageTitle() {
    if (id) return <h3>Update Employee</h3>;
    else return <h3>Add Employee</h3>;
  }

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setlastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId)
          // console.log(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);
  return (
    <div className="form-container container col-md-4">
      <form className="container col-md-11">
        <div className="form-group">
          {pageTitle()}
          <br />
          <label htmlFor="firstName">
            Employee First Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            className="form-control"
            name="firstName"
            placeholder="John"
          />
          <br />
          <label htmlFor="lastName">
            Employee Last Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
            required
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Doe"
          />
          <br />
          <label htmlFor="email">
            Employee Email <span style={{ color: "red" }}>*</span>
          </label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="form-control"
            name="email"
            placeholder="Doe"
          />
          <br />

          <select
            className="form-select"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option defaultValue="Select Department">Select Department</option>
            {departments.map((departmentObj) => (
              <option key={departmentObj.id} value={departmentObj.id}>
                {departmentObj.department}
              </option>
            ))}
          </select>
        </div>

        <br />
        <button
          onClick={addEmployeeButton}
          type="submit"
          className="btn btn-primary"
        >
          {id ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeComponent;
