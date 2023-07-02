import React, { useState, useEffect } from 'react';

export default function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees().then(data => setEmployees(data));
  }, []);

  async function getEmployees() {
    return fetch('/employees').then(response => response.json());
  }

  async function createEmployee(name, value) {
    await fetch('/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, value: value })
    });
    // After creating the employee, fetch the updated employee list
    getEmployees().then(data => setEmployees(data));
  }

  async function updateEmployee(name, value) {
    await fetch('/employees', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, value: value })
    });
    // After updating the employee, fetch the updated employee list
    getEmployees().then(data => setEmployees(data));
  }

  return (
    <div>
      <h1>Employee List</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.name}>
            {employee.name}: {employee.value}
          </li>
        ))}
      </ul>
      <form
        onSubmit={event => {
          event.preventDefault();
          const { name, value } = event.target.elements;
          createEmployee(name.value, parseInt(value.value));
          name.value = '';
          value.value = '';
        }}
      >
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Value:
          <input type="number" name="value" />
        </label>
        <br />
        <button type="submit">Create Employee</button>
      </form>
      <hr />
      <form
        onSubmit={event => {
          event.preventDefault();
          const { name, value } = event.target.elements;
          updateEmployee(name.value, parseInt(value.value));
          name.value = '';
          value.value = '';
        }}
      >
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          Value:
          <input type="number" name="value" />
        </label>
        <br />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}
