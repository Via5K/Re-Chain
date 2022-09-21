import { useRef, useState } from 'react';
import { validateID } from './validations.js';
import styles from '../../styles/Forms.module.css';
import PatientData from '../cards/PatientData.js';
import GetData from '../scripts/GetData.js';
import Modal from '../cards/Modal';

export default function PatientForm() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong!');
  const [ID, setID] = useState('');
  const [Patient, setPatient] = useState({
    patientsID: '',
    patientsName: '',
    number: '',
    gender: '',
    address: '',
    dob: '',
    allergies: '',
    walletAddress: '',
  });

  const IDRef = useRef();

  const { getPatient } = GetData();

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
    if (!validateID(IDRef.current.value.trim())) {
      valid = false;
      msg = msg + "  Invalid Patient's ID  |";
    }
    await setID(IDRef.current.value.trim());

    if (valid == false) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    }
    const result = await getPatient(IDRef.current.value);

    const data = { ...Patient };
    data.patientsID = IDRef.current.value;
    data.patientsName = result[0];
    data.number = result[1];
    data.gender = result[2];
    data.address = result[3];
    data.dob = result[4];
    let allergies = result[5];
    data.walletAddress = result[6];

    if (data.patientsName == '' || data.patientsName == undefined) {
      msg = `No patient with id ${IDRef.current.value}`;
      await setMessage(msg);
      await setShowModal(true);
      return;
    }

    //new addition to make sure we have allergies unique
    // const allergiesSet = new Set();
    var temp = ''; //so that if submitted more than once, it does not keeps on appending the data.
    //start from 11 because it gives patient ID, then allergies.
    for (let i = 11; i < allergies.length; i++) {
      // data.allergies += allergies[i];
      temp += allergies[i];
      // allergiesSet.add(allergies[i]);
    }
    // allergiesSet.forEach((value) => {
    //   temp += value;
    //   console.log(value);
    // });
    data.allergies = temp;
    //end
    await setPatient(data);

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

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="id">Patient's ID:</label>
        <input
          type="text"
          id="id"
          placeholder="Patient ID"
          ref={IDRef}
          required
        />
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>

      <PatientData Patient={Patient} />

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
