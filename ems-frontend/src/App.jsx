import ListEmployeeComponent from "./components/ListEmployeeComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EmployeeComponent from "./components/EmployeeComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import DepartmentComponent from "./components/DepartmentComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          <Route path="/departments" element={<ListDepartmentComponent />}></Route>
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          <Route path="/add-department" element={<DepartmentComponent />}></Route>
          <Route path="/edit-employee/:id" element={<EmployeeComponent />}></Route>
          <Route path="/edit-department/:id" element={<DepartmentComponent />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
