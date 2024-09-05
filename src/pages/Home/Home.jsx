import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { deleteUser, getAllUsers } from "../../services/userServices";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const Home = () => {
  // State to store fetched users, loading status, error message, and alert visibility
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  // Fetch all users when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = (id) => {
    setLoading(true)
    deleteUser(id)
      .then((response) => {
        setLoading(false)
        setIsAlertVisible(true);
        setAlertMessage("User Deleted Successfully");
      })
      .catch((err) => {
        setIsAlertVisible(true);
        setAlertMessage("Failed to delete user");
      });
  };

  // Close the alert
  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <div className={styles.container}>
      {/* Show custom alert if visible */}
      {isAlertVisible && (
        <CustomAlert message={alertMessage} onClose={closeAlert} />
      )}

      {/* Button to add a new user */}
      <Link to="/user" className={styles.addUserButton}>
        Add New User
      </Link>
      <h1 className={styles.heading}>All Users Information</h1>

      {/* Show loading spinner or the user table */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Name</th>
                  <th className={styles.tableHeader}>Email</th>
                  <th className={styles.tableHeader}>Phone</th>
                  <th className={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through users and display each one */}
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className={styles.tableCell}>{user.name}</td>
                    <td className={styles.tableCell}>{user.email}</td>
                    <td className={styles.tableCell}>{user.phone}</td>
                    <td className={styles.tableCell}>
                      {/* Edit button to modify user */}
                      <Link
                        to={`/user/${user.id}/modify`}
                        className={styles.editButton}
                      >
                        Edit
                      </Link>

                      {/* Delete button to remove user */}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
