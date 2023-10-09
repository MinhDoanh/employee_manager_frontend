// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
// import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [position, setPosition] = useState('');
  const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
  const employeesPerPage = 10; // Số lượng nhân viên mỗi trang

  // const localhost = 'http://113.187.9.16:3001';
  // const localhost = 'https://backendnodejs-03nf.onrender.com';
  const localhost = 'http://localhost:3001';

  useEffect(() => {
    // Gọi API để lấy danh sách nhân viên khi component được tạo
    fetch(`${localhost}/api/employees/get-all`)
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  const addEmployee = () => {
    fetch(`${localhost}/api/employees/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age, position }),
    })
      .then(() => {
        alert('Employee added');
        // setName('');
        // setAge('');
        // setPosition('');
        // Sau khi thêm nhân viên, cập nhật danh sách nhân viên
        return fetch(`${localhost}/api/employees/get-all`);
      })
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error('Error adding employee:', error);
        alert('Error adding employee');
      });
  };

  const updateEmployee = (id) => {
    fetch(`${localhost}/api/employees/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age, position }),
    })
      .then(() => {
        alert('Employee updated');
        setName('');
        setAge('');
        setPosition('');
        // Sau khi cập nhật nhân viên, cập nhật danh sách nhân viên
        return fetch(`${localhost}/api/employees/get-all`);
      })
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error('Error updating employee:', error);
        alert('Error updating employee');
      });
  };

  const deleteEmployee = (id) => {
    fetch(`${localhost}/api/employees/delete/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        alert('Employee deleted');
        setName('');
        setAge('');
        setPosition('');
        // Sau khi xóa nhân viên, cập nhật danh sách nhân viên
        return fetch(`${localhost}/api/employees/get-all`);
      })
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee');
      });
  };

  // Tính toán chỉ mục bắt đầu và kết thúc của nhân viên trên trang hiện tại
  const startIndex = pageNumber * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const displayedEmployees = employees.slice(startIndex, endIndex);

  const pageCount = Math.ceil(employees.length / employeesPerPage);

  const handlePageClick = (data) => {
    setPageNumber(data.selected);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Management</h2>
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => { setName(e.target.value); }}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Age"
            value={age}
            onChange={(e) => { setAge(e.target.value); }}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Position"
            value={position}
            onChange={(e) => { setPosition(e.target.value); }}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={addEmployee}>
            Add Employee
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th style={{ width: 176 }}>Action </th>
          </tr>
        </thead>
        <tbody>
          {displayedEmployees.map((employee, index) => (
            <tr key={employee.EmployeeID}>
              <td>{startIndex + index + 1}</td>
              <td>{employee.Name}</td>
              <td>{employee.Age}</td>
              <td>{employee.Position}</td>
              <td>
                <button
                  className="btn btn-warning"
                  style={{ marginRight: 10 }}
                  onClick={() => updateEmployee(employee.EmployeeID)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmployee(employee.EmployeeID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
          pageClassName={'page-item'} // Sử dụng lớp CSS "page-item" của Bootstrap cho các trang
          breakClassName={'page-item'} // Sử dụng lớp CSS "page-item" của Bootstrap cho dấu chấm (...)
          pageLinkClassName={'page-link'} // Sử dụng lớp CSS "page-link" của Bootstrap cho số trang
          breakLinkClassName={'page-link'} // Sử dụng lớp CSS "page-link" của Bootstrap cho dấu chấm (...)
        />
      </div>
    </div>
  );
}

export default App;
