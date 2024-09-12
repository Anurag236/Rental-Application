// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setReservationList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"
// import { baseUrl } from "../Urls";
// const ReservationList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const reservationList = useSelector((state) => state.user.reservationList);

//   const dispatch = useDispatch();

//   const getReservationList = async () => {
//     try {
//       const response = await fetch(
//         `${baseUrl}/users/${userId}/reservations`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       dispatch(setReservationList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Reservation List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getReservationList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Reservation List</h1>
//       <div className="list">
//         {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
//           <ListingCard
//             listingId={listingId._id}
//             creator={hostId._id}
//             listingPhotoPaths={listingId.listingPhotoPaths}
//             city={listingId.city}
//             province={listingId.province}
//             country={listingId.country}
//             category={listingId.category}
//             startDate={startDate}
//             endDate={endDate}
//             totalPrice={totalPrice}
//             booking={booking}
//           />
//         ))}
//       </div>
//   <Footer/>
//     </>
//   );
// };

// export default ReservationList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";
import axios from "axios"; // Import axios
const baseUrl = "https://home-rental-application-two.vercel.app"; // Updated baseUrl

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
  }, [formData.password, formData.confirmPassword]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();

      for (const key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await axios.post(`${baseUrl}/auth/register`, registerForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Include credentials if needed
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (err) {
      console.error("Request failed with error:", err);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assests/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In</a>
      </div>
    </div>
  );
};

export default RegisterPage;
