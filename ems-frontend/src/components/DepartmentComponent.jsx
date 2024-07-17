import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  createDepartment,
  getDepartment,
  updateDepartment,
} from "../services/DepartmentService";

function DepartmentComponent() {
  const [department, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const { id } = useParams();
  const navigator = useNavigate();

  const addDepartmentButton = (e) => {
    e.preventDefault();

    if (department == "" || departmentDescription == "")
      return alert("All fields are necessary!");

    const departmentObj = {
      department,
      departmentDescription,
    };

    console.log(departmentObj, id);
    id ? updateDepartment(id, departmentObj) : createDepartment(departmentObj);
    navigator("/departments");
  };

  function pageTitle() {
    if (id) return <h3>Update Department</h3>;
    else return <h3>Add Department</h3>;
  }

  useEffect(() => {
    if (id) {
      getDepartment(id)
        .then((response) => {
          setDepartmentName(response.data.department);
          setDepartmentDescription(response.data.departmentDescription);

          console.log(response.data);
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
          <label htmlFor="department">
            Department <span style={{ color: "red" }}>*</span>
          </label>
          <input
            required
            onChange={(e) => setDepartmentName(e.target.value)}
            value={department}
            type="text"
            className="form-control"
            name="department"
            placeholder="(HR / R&D / etc )"
          />
          <br />
          <label htmlFor="departmentDescription">
            Department Description <span style={{ color: "red" }}>*</span>
          </label>
          <input
            onChange={(e) => setDepartmentDescription(e.target.value)}
            value={departmentDescription}
            required
            type="text"
            className="form-control"
            name="departmentDescription"
            placeholder="(It handles the inner operations of the company)"
          />
          <br />
        </div>

        <br />
        <button
          onClick={addDepartmentButton}
          type="submit"
          className="btn btn-primary"
        >
          {id ? "Update Department" : "Add Department"}
        </button>
      </form>
    </div>
  );
}

export default DepartmentComponent;
