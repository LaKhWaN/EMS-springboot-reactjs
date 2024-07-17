import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listDepartments, deleteDepartment } from "../services/DepartmentService";

function ListDepartmentComponent() {
  const navigator = useNavigate();

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

  const addNewDepartment = () => {
    navigator("/add-department");
  };

  const updateButton = (id) => {
    navigator(`/edit-department/${id}`);
  };

  const deleteButton = (id) => {
    deleteDepartment(id)
      .then((response) => {
        navigator("/departments");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="container center">
      <h2 className="text-center">List of Departments</h2>
      <button
        onClick={addNewDepartment}
        type="button"
        className="btn btn-primary"
      >
        Add Department
      </button>
      <br />
      <br />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => {
            return (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.department}</td>
                <td>{department.departmentDescription}</td>
                <td>
                  <button
                    onClick={() => updateButton(department.id)}
                    type="button"
                    className="btn btn-info"
                  >
                    Update
                  </button>

                  <button
                    style={{ margin: "2%" }}
                    onClick={() => deleteButton(department.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListDepartmentComponent;
