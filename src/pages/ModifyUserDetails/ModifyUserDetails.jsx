import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserDetails, updateUser } from "../../services/userServices";
import styles from "./ModifyUserDetails.module.css";
import Spinner from "../../components/Spinner/Spinner";
import InputComponent from "../../components/InputComponent/InputComponent";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const ModifyUserDetails = () => {
  const { id } = useParams(); // Get the user ID from the URL parameters
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" }); // Store user details
  const [loading, setLoading] = useState(true); // Loading state for API calls
  const [error, setError] = useState(null); // Error state for API failures
  const [isAlertVisible, setIsAlertVisible] = useState(false); // State to control alert visibility
  const [alertMessage, setAlertMessage] = useState(null); // Message displayed in alert
  const navigateTo = useNavigate(); // For redirection after user update

  // Fetch user details when the component loads
  useEffect(() => {
    getUserDetails(id)
      .then((response) => {
        setUserData(response.data); // Populate form with fetched data
        setLoading(false); // Stop loading spinner
      })
      .catch((err) => {
        setError("Failed to fetch user data");
        setLoading(false); // Stop loading even on error
      });
  }, [id]);

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value, // Update specific field in userData
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading spinner
      const response = await updateUser(id, userData);
      if (response.status == 200) {
        setLoading(false);
        setIsAlertVisible(true); // Show success alert
        setAlertMessage("User Updated Successfully");
      }
    } catch (error) {
      setError("Failed to update user"); // Handle update error
    }
  };

  // Close alert and navigate back to the home page if the update was successful
  const closeAlert = () => {
    if (alertMessage === "User Updated Successfully") {
      navigateTo("/");
    }
    setIsAlertVisible(false);
  };

  if (loading) return <Spinner />; // Show spinner while loading
  if (error) return <p className={styles.error}>{error}</p>; // Show error if fetch fails

  return (
    <div className={styles.container}>
      {/* Display custom alert if visible */}
      {isAlertVisible && (
        <CustomAlert message={alertMessage} onClose={closeAlert} />
      )}
      <h1 className={styles.heading}>Edit User Details</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Input fields for user details */}
        <InputComponent
          labelValue={"Name"}
          InputValue={userData.name}
          handelOnChange={handleInputChange}
          inputType={"text"}
          inputName={"name"}
        />
        <InputComponent
          labelValue={"Email"}
          InputValue={userData.email}
          handelOnChange={handleInputChange}
          inputType={"email"}
          inputName={"email"}
        />
        <InputComponent
          labelValue={"Phone"}
          InputValue={userData.phone}
          handelOnChange={handleInputChange}
          inputType={"text"}
          inputName={"phone"}
        />
        <button type="submit" className={styles.submitButton}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default ModifyUserDetails;

