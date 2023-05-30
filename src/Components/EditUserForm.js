import React from 'react'
  // Manage State of Values
import { useState } from "react";
  // Enable Navigation to a Different View
import { useNavigate } from "react-router-dom";
  // Enable Connection to Firebase User Authorization (Login)
import { auth } from "../Firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
  // User Picture Upload Widget from Cloudinary
  // import UploadWidget from "./UploadWidget.js"
import "../Components/NewForm.css"
  // imports for material design bootstrap
import { 
  MDBCard, 
  MDBCardBody, 
  MDBCardHeader, 
  MDBCheckbox, 
  MDBCol, 
  MDBBtn,
  MDBInput, 
  MDBRow,
  MDBTypography
 } from 'mdb-react-ui-kit';

  // Set API Variable to Port for this React App to display in Browser
const API = process.env.REACT_APP_API_URL;


function EditUserForm() {
  //Set state for auth and updatedUser
  const [user, loading] = useAuthState(auth);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    zip_code: "",
    birthday: "",
    gender: "",
    sexual_orientation: "",
    has_pets: false,
    has_open_rooms: false,
    is_smoker: false,
    has_kids: false,
    is_disabled: false,
    is_sharing_bills: false,
    is_neat: false,
    is_religious: false,
    move_in_date: "",
    max_rent: "",
    credit_score: "",
    income: "",
   // is_employed: true,                //need to be added to backend
    is_student: false,                  //need to be added to backend
   // is_healthy: true,                 //need to be added to backend
   // has_allergies: false,             //need to be added to backend
    is_disabled: false,                 //need to be added to backend
   // has_chronic_condition: false,     //need to be added to backend (in Answers table)
   // has_visiting_nurse: false,        //need to be added to backend
   // has_home_assistance: false,       //need to be added to backend
    is_musician: false,                 //need to be added to backend
    is_singer: false,                   //need to be added to backend
    host_parties: false,                //need to be added to backend
   // has_romantic_visits: false,       //need to be added to backend
   // has_family_friend_visits: false,  //need to be added to backend
   // has_night_life: false,            //need to be added to backend
  });

let navigate = useNavigate();
   

    // AXIOS CALL -  make an axios call to backend to be able to post info re new user from form

  const updateUser = (updatedUser) => {
    axios
      .put(`${API}/user/${user.uid}`, updatedUser)
      .then(() => {
        navigate(`/preferences`);
      })
      .catch((c) => console.warn("catch", c));
  };

  // Capture changes made by user and send to backend
  // set updated state of updatedUser to what the user enters
  const handleTextChange = (event) => {
    setUpdatedUser({ ...updatedUser, [event.target.id]: event.target.value });
  };
  // console.log("newly added user", updatedUser)
  
  const handleCheckboxChange = (event) => {
    setUpdatedUser({ ...updatedUser, [event.target.id]: !updatedUser[event.target.value] });
  };

  function handleSubmit(event) {
    event.preventDefault();
    event.target.className += " was-validated"
    updateUser(updatedUser);
    //addUserImage(image)
  }
  
 
  return !loading ? (
    <div className="newFormBox ">      
      <form className="newform needs-validation"
            onSubmit={handleSubmit}
            noValidate >
        <MDBRow>
          <MDBCol md="8" className="mb-4">
            <MDBCard className="mb-4 newForm-card">
              <MDBCardHeader className="py-2">
                <MDBTypography tag="h5" className="mb-0">New Account Form</MDBTypography>
              </MDBCardHeader>
                <MDBCardBody>
             
                   {/* ********** Basic Info - Row 1 ********** */}  

                  <MDBRow className="mb-3">
                    <MDBCol>
                      <MDBInput 
                        label='First name'    type='text' 
                        onChange={handleTextChange}
                        value={updatedUser.first_name}
                        id="first_name"       required
                      /> 
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                    <MDBCol >
                      <MDBInput 
                        label='Last name'   type='text' 
                        onChange={handleTextChange}
                        value={updatedUser.last_name}
                        id="last_name"      required
                      />
                    </MDBCol>
                  </MDBRow>


                    {/* ********** Basic Info -  Row 2 ********** */}

                  <MDBRow className="mb-3">
                  <MDBCol >
                    <MDBInput label='City' type='text'
                      onChange={handleTextChange}
                      value={updatedUser.city}
                      id="city"
                      required 
                    />
                  </MDBCol>

                  <MDBCol>
                    <MDBInput label='State' type='text' 
                      onChange={handleTextChange}
                      value={updatedUser.state}
                      id="state"
                      required
                    />
                  </MDBCol>

                  <MDBCol>
                    <MDBInput label='Zip Code' type='number' 
                      onChange={handleTextChange}
                      value={updatedUser.zip_code}
                      id="zip_code"
                      required
                    />
                  </MDBCol>
                </MDBRow>

                  {/* ********** Basic Info - Row 3 ********** */}

                <MDBRow className="mb-3">
                  <MDBCol > {/* md="3" */}
                    <MDBInput className='birthDate-attribute birthdate-MDB-input' label='Date of Birth' type='date' 
                      onChange={handleTextChange}
                      value={updatedUser.birthday}
                      id="birthday"
                      required
                    />
                  </MDBCol>

                  <MDBCol>
                    <select
                      className="gender-attribute form-control"
                      onChange={handleTextChange}
                      value={updatedUser.gender}
                      id="gender"
                      required
                   > 
                      <option defaultValue={"gender"}>Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Intersex</option>
                      <option value="4">Non-Binary</option>
                      <option value="5">Transgender</option>
                      <option value="6">Other/Decline to Share</option>
                    </select>
                  </MDBCol>

                   <MDBCol >     
                    <select className="orientation-attribute form-control"
                      onChange={handleTextChange}
                      value={updatedUser.sexual_orientation}
                      id="sexual_orientation"
                      required
                    >  
                      <option defaultValue={"Heterosexual"}>Orientation</option>
                      <option value="1">Heterosexual</option>
                      <option value="2">Pansexual</option>
                      <option value="3">BiSexual</option>
                      <option value="4">Homosexual</option>
                      <option value="5">Asexual</option>
                      <option value="6">Other/Decline to Share</option>
                    </select>
                  </MDBCol>
                </MDBRow>

                  {/*B  ********** Basic Info -  Row 4  **********  */}

                <MDBRow className="mb-1">
                  <MDBCol>
                    <MDBInput label='Email' type='text' className="mb-4"
                      onChange={handleTextChange}
                      value={updatedUser.email}
                      id="email"
                      required
                    />
                  </MDBCol>
                  
                  <MDBCol md="4">
                    <MDBInput label='Move-In Date Range' type='date'
                      onChange={handleTextChange}
                      value={updatedUser.move_in_date}
                      id="move_in_date"
                      required
                    />
                  </MDBCol>          
                  <MDBCol md="4">
                    <MDBInput label='Credit Level' type='text'
                      onChange={handleTextChange}
                      value={updatedUser.credit_score}
                      id="credit_score"
                      required
                    />
                  </MDBCol>
                </MDBRow>

                  {/* ********** Basic Info - Row 5 (Financial Attributes) ********** */}

                <MDBRow className="mb-3">
                  {/* <MDBCol>
                  <MDBCheckbox
                      name="flexCheck"
                      label='Employed' type='text'
                      onChange={handleCheckboxChange}
                      value={updatedUser.is_employed}
                      id="has_job"
                      required
                    />
                  </MDBCol> */}
                  <MDBCol>
                    <MDBInput label='Income Level' type='text'
                      onChange={handleTextChange}
                      value={updatedUser.income}
                      id="income"
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <MDBInput label="Max Rent Budget" type='number' 
                      onChange={handleTextChange}
                      value={updatedUser.max_rent}
                      id="max_rent"
                      required
                    />                 
                  </MDBCol> 
                </MDBRow>

                  {/* ********** Attributes (Financial) - Row 6 - (Checkboxes- Row A)********** */}
    
                <MDBRow className="mb-3">
                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Agree To Share Bills"
                      onChange={handleCheckboxChange}
                      value={updatedUser.is_sharing_bills}
                      id="is_sharing_bills"
                      required />
                  </MDBCol>

                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Have Open Rooms"
                      onChange={handleCheckboxChange}
                      value={updatedUser.has_open_rooms}
                      id="has_open_rooms"
                      required
                      /> 
                  </MDBCol> 
                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Live in a High Rise"
                      onChange={handleCheckboxChange}
                      value={updatedUser.high_rise}
                      id="high_rise"
                      required
                      /> 
                 </MDBCol> 

                 <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Live in a House"
                      onChange={handleCheckboxChange}
                      value={updatedUser.house}
                      id="house"
                      required
                        /> 
                  </MDBCol> 
                </MDBRow>

                {/* ********** Attributes (LifeStyle, Amenities) - Row 7 - (Checkboxes- Row B) ********** */}

                <MDBRow className="mb-3">
                  <MDBCol>
                  <MDBCheckbox
                      name="flexCheck"
                      label="Very Neat"
                      onChange={handleCheckboxChange}
                      value={updatedUser.is_neat}
                      id="is_neat"
                      /> 
                  </MDBCol>
                  <MDBCol>
                  <MDBCheckbox
                      name="flexCheck"
                      label="Low Noise Lifestyle"
                      onChange={handleCheckboxChange}
                      value={updatedUser.low_noise}
                      id="low_noise"
                      required
                      /> 
                  </MDBCol>
                  <MDBCol>
                  <MDBCheckbox
                      name="flexCheck"
                      label="Have Private Room"
                      onChange={handleCheckboxChange}
                      value={updatedUser.private_room}
                      id="private_room"
                      required
                      /> 
                    </MDBCol>
                    <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Have Private Bathroom"
                      onChange={handleCheckboxChange}
                      value={updatedUser.private_bathroom}
                      id="private_bathroom"
                      required
                      /> 
                    </MDBCol>
                </MDBRow>

                  {/* ********** Attributes (LifeStyle, Obligations) - Row 8 - (Checkboxes- Row C) ********** */}

                <MDBRow className="mb-3">
                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Religious"
                      onChange={handleCheckboxChange}
                      value={updatedUser.is_religious}
                      id="is_religious"
                      required
                      />
                  </MDBCol>

                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Have Kids"
                      onChange={handleCheckboxChange}
                      value={updatedUser.has_kids}
                      id="has_kids"
                      required
                  />
                  </MDBCol>

                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Have Pets"
                      onChange={handleCheckboxChange}
                      value={updatedUser.has_pets}
                      id="has_pets"
                      required
                    />
                  </MDBCol>

                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Smoker"
                      onChange={handleCheckboxChange}
                      value={updatedUser.is_smoker}
                      id="is_smoker"
                      required
                    />
                  </MDBCol>
                </MDBRow>

                {/* ********** Attributes (Activities) - Row 9 - (Checkboxes- Row D) ********** */}

                <MDBRow className="mb-3">
                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Student"
                      onChange={handleCheckboxChange}
                      value={updatedUser.is_student}
                      id="is_student"
                      required
                 />
                  </MDBCol>

                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Musician"
                      onChange={handleCheckboxChange}
                      value={updatedUser.is_musician}
                      id="is_musician"
                      required
                  />
                  </MDBCol>

                  <MDBCol>
                    <MDBCheckbox
                      name="flexCheck"
                      label="Singer"
                      onChange={handleCheckboxChange}
                      value={updatedUser.is_singer}
                      id="is_singer"
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <MDBCheckbox
                        name="flexCheck"
                        label="Host Parties"
                        onChange={handleCheckboxChange}
                        value={updatedUser.host_parties}
                        id="host_parties"
                        required
                    />
                  </MDBCol>
                </MDBRow>

                {/* ********** (Create Account Button) - Row 10 - (Checkboxes- Row E) ********** */}

                <MDBRow className="mb-5">
                  <MDBCol>
                    <div className="d-flex justify-content-center">
                      {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckChecked' label='Create an account' defaultChecked /> */}
                      <MDBBtn 
                        className='newForm-submitBtn' 
                        type="submit" 
                        onClick={handleSubmit}
                        form="form">Submit</MDBBtn>
                      </div>
                    </MDBCol>
                </MDBRow> 

                {/* ********** End of Input Fields  ********** */}
             
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </form>
    </div>

) : (
  ""
  );
}

export default EditUserForm


// Additional Preferences

// is_employed: true,      //need to be added to backend
// is_student: false,      //need to be added to backend
// is_healthy: true,       //need to be added to backend
// has_allergies: false,   //need to be added to backend
// is_disabled: false,     //need to be added to backend
// has_chronic_condition: false,    //need to be added to backend
// has_visiting_nurse: false,       //need to be added to backend
// has_home_assistance: false,      //need to be added to backend
// is_musician: false,     //need to be added to backend
// is_singer: false,       //need to be added to backend
// host_parties: false,    //need to be added to backend
// has_romantic_visits: false,       //need to be added to backend
// has_family_friend_visits: false,  //need to be added to backend
// has_night_life: false,            //need to be added to backend
