import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

function ListEmployeeComponent() {
  const navigator = useNavigate();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [employees]);

  const addNewEmployee = () => {
    navigator("/add-employee");
  };

  const updateButton = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const deleteButton = (id) => {
    deleteEmployee(id)
      .then((response) => {
        navigator("/employees");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="container center">
      <h2 className="text-center">List of Employees</h2>
      <button
        onClick={addNewEmployee}
        type="button"
        className="btn btn-primary"
      >
        Add Employee
      </button>
      <br />
      <br />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    onClick={() => updateButton(employee.id)}
                    type="button"
                    className="btn btn-info"
                  >
                    Update
                  </button>

                  <button
                    style={{ margin: "2%" }}
                    onClick={() => deleteButton(employee.id)}
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

export default ListEmployeeComponent;
