import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../common/Search";

const StudentsView = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStudents();
  }, []); //to call the loadStudents;
  const loadStudents = async () => {
    const result = await axios.get("http://localhost:8080/students", {
      validateStatus: () => {
        return true;
      },
    });
    if (result.status == 302) {
      setStudents(result.data); //help us to load students from db
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/students/delete/${id}`);
    loadStudents();
  };

  return (
    <section>
      <Search search={search} setSearch={setSearch} />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {students
            .filter((st) => st.firstName.toLowerCase().includes(search))
            .map((student, index) => (
              <tr key={student.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td className="mx-2">
                  <Link
                    to={`/student-profile/${student.id}`}
                    className="btn btn-info">
                    <FaEye />
                  </Link>
                </td>
                <td className="mx-2">
                  <Link
                    to={`/edit-student/${student.id}`}
                    className="btn btn-warning">
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default StudentsView;
