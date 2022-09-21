import { useRef, useState } from 'react';
import { validateID, validateName, validateAddress } from './validations.js';
import styles from '../../styles/Forms.module.css';
import AddData from '../scripts/AddData.js';
import Modal from '../cards/Modal';

export default function PatientRegistrationForm() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong! ');
  const [Data, setData] = useState({
    patientsID: '',
    patientsName: '',
    number: '',
    address: '',
    allergies: '',
    gender: '',
    dob: '',
    walletAddress: '',
  });

  const patientsIDRef = useRef();
  const patientsNameRef = useRef();
  const addressRef = useRef();
  const allergiesRef = useRef();
  const dobRef = useRef();
  const walletAddressRef = useRef();

  const { addPatient } = AddData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    msg = `Processing Request: Please wait`;
    await setMessage(msg);
    await setShowModal(true);
    setTimeout(() => {
      msg = 'Invalid Input: Please enter valid input values ⁉️  ';
      setShowModal(false);
      setMessage(msg);
    }, 5000);

    let valid = true;
    let msg = 'Invalid Input: ';
    let data = { ...Data };

    data.number = patientsIDRef.current.value.replace(/\s+/g, ' ').trim();
    data.patientsID = patientsIDRef.current.value.replace(/\s+/g, ' ').trim();
    let num = data.number;
    // num = `${num}${num.charAt(0)}${num.charAt(1)}`;

    if (validateID(num)) data.patientsID = num;
    else {
      valid = false;
      msg = msg + '  Invalid Number,  ';
    }
    if (validateName(patientsNameRef.current.value.replace(/\s+/g, ' ').trim()))
      data.patientsName = patientsNameRef.current.value
        .replace(/\s+/g, ' ')
        .trim();
    else {
      valid = false;
      msg = msg + '  Invalid Name,  ';
    }
    if (validateAddress(addressRef.current.value.replace(/\s+/g, ' ').trim()))
      data.address = addressRef.current.value.replace(/\s+/g, ' ').trim();
    // remove extra spaces
    else {
      valid = false;
      msg = msg + '  Invalid Address,  ';
    }

    let allergies = allergiesRef.current.value.replace(/\s+/g, ' ').trim(); // remove all extra spaces
    data.allergies = allergies;

    // let allergies = allergiesRef.current.value.replace(/\s+/g, '').trim(); // remove all spaces
    // if (allergies.length > 3) {
    //   allergies = allergies.split(',');
    //   let temp = data.allergies.concat(allergies);
    //   allergies = [...new Set([...data.allergies, ...allergies])];
    //   data.allergies = [...allergies];
    //   console.log(allergies);
    // }

    data.dob = String(dobRef.current.value);
    if (data.dob == '' || data.dob == undefined) {
      valid = false;
      msg = msg + '  Invalid Date of Birth,  ';
    }
    data.gender = gender;
    await setData(data);
    console.log(JSON.stringify(data));

    data.walletAddress = walletAddressRef.current.value;
    if (data.walletAddress == '' || data.walletAddress.size != 40) {
      valid = false;
      msg = msg + "  Invalid Patient's Wallet Address,  ";
    }

    if (valid == false) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    } else {
      msg = `Data is being uploaded. Please wait...`;
      await setMessage(msg);
      await setShowModal(true);
    }

    await addPatient(data);

    // Success Message modal popup
    msg = `Data Transaction Successful`;
    await setMessage(msg);
    await setShowModal(true);
    setTimeout(() => {
      msg = 'Invalid Input: Please enter valid input values ⁉️  ';
      setShowModal(false);
      setMessage(msg);
    }, 5000);
    return true;
  };

  let gender = 'Male';
  const setGender = (e) => {
    gender = e.target.value;
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="patient-name">Patient's Name: </label>
        <input
          type="text"
          name="patient-name"
          id="patient-name"
          className="patient-name"
          placeholder="Patient's Name"
          ref={patientsNameRef}
          required
        />

        <label htmlFor="phone-number">Phone Number: </label>
        <input
          type="tel"
          name="phone-number"
          id="phone-number"
          className="phone-number"
          placeholder="Phone Number"
          ref={patientsIDRef}
          required
        />

        <div className={styles.rowForm}>
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" ref={dobRef} required />
        </div>

        <div className={styles.rowForm} onChange={setGender}>
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" name="gender" value="Male" />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" name="gender" value="Female" />
        </div>

        <label htmlFor="patients-address">Address: </label>
        <textarea
          name="patients-address"
          id="patients-address"
          cols="20"
          rows="4"
          placeholder="Address"
          ref={addressRef}
          required
        ></textarea>

        <label htmlFor="allergies">Allergies: </label>
        <textarea
          name="allergies"
          id="allergies"
          cols="20"
          rows="4"
          placeholder="Allergies"
          ref={allergiesRef}
          required
        ></textarea>
        <label htmlFor="patient-walletAddress">
          Patient's Wallet Address:{' '}
        </label>
        <input
          type="text"
          name="patient-walletAddress"
          id="patient-walletAddress"
          // className="patient-name"
          placeholder="0x087298b2F76741E2D30566A7f5138D6896aBf108"
          ref={walletAddressRef}
          required
        />
        <button type="submit" className={styles.btn}>
          Submit
        </button>
        {/* <div className={styles.state}>
        <span>{JSON.stringify(Data)}</span>
      </div> */}
      </form>

      <section>
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            {Message}
          </Modal>
        )}
      </section>
    </>
  );
}
