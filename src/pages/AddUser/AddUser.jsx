import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddUser.module.css";
import { createUser } from "../../services/userServices";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import InputComponent from "../../components/InputComponent/InputComponent";
import Spinner from "../../components/Spinner/Spinner";

const AddUser = () => {
  // State to store user input data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  // State for handling errors, loading, and alert visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigate = useNavigate();

  // Handle input changes and update user data
  const handelOnChange = (e) => {
    setUserData((preData) => ({ ...preData, [e.target.name]: e.target.value }));
  };

  // Handle form submission to create a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!userData.name || !userData.email || !userData.phone) {
      setIsAlertVisible(true);
      setAlertMessage("All Fields Are Required");
      return;
    }

    // Show loading spinner and attempt to create user
    setLoading(true);
    createUser(userData)
      .then((response) => {
        setLoading(false);
        setIsAlertVisible(true);
        setAlertMessage("User Created Successfully");
      })
      .catch((err) => {
        setError("Failed to add user");
      });
  };

  // Close alert and navigate to home page if user was created
  const closeAlert = () => {
    if (alertMessage === "User Created Successfully") {
      navigate("/");
    }
    setIsAlertVisible(false);
  };

  // Show loading spinner if data is being processed
  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      {/* Show custom alert if visible */}
      {isAlertVisible && (
        <CustomAlert message={alertMessage} onClose={closeAlert} />
      )}
      <h1 className={styles.heading}>Add New User</h1>

      {/* User input form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputComponent
          labelValue={"Name"}
          InputValue={userData.name}
          handelOnChange={handelOnChange}
          inputType={"text"}
          inputName={"name"}
        />
        <InputComponent
          labelValue={"Email"}
          InputValue={userData.email}
          handelOnChange={handelOnChange}
          inputType={"email"}
          inputName={"email"}
        />
        <InputComponent
          labelValue={"Phone"}
          InputValue={userData.phone}
          handelOnChange={handelOnChange}
          inputType={"number"}
          inputName={"phone"}
        />
        <button type="submit" className={styles.submitButton}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;

