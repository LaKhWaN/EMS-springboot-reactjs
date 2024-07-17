import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigator = useNavigate();

  const employeeNav = () => {
    navigator("/employees");
  };

  const departmentNav = () => {
    navigator("/departments");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand">
          Employee Management System
        </a>
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a onClick={employeeNav} className="nav-link" href="#">
                Employee
              </a>
            </li>
            <li className="nav-item">
              <a onClick={departmentNav} className="nav-link" href="#">
                Department
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
