import { useRef, useState } from 'react';
import { validateID, validateName } from './validations.js';
import styles from '../../styles/Forms.module.css';
import AddData from '../scripts/AddData.js';
import Modal from '../cards/Modal';

export default function RegistrationForm() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong ⁉️  ');
  const [Data, setData] = useState({
    doctorsID: '',
    speciality: '',
    doctorsName: '',
    hospital: '',
    gender: '',
  });

  const { addDoctor } = AddData();

  const specialityRef = useRef();
  const doctorsNameRef = useRef();
  const hospitalRef = useRef();
  const doctorsIDRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let msg = 'Invalid Input: Please enter valid input values ⁉️  ';
    let data = { ...Data };

    if (validateID(doctorsIDRef.current.value.trim())) {
      data.doctorsID = doctorsIDRef.current.value.trim();
    } else {
      valid = false;
      msg = msg + '|  Invalid Number  |';
    }
    if (validateName(specialityRef.current.value.trim())) {
      data.speciality = specialityRef.current.value.trim();
    } else {
      valid = false;
      msg = msg + '|  Invalid Speciality  |';
    }
    if (validateName(doctorsNameRef.current.value.trim())) {
      data.doctorsName = doctorsNameRef.current.value.trim();
    } else {
      valid = false;
      msg = msg + '|  Invalid Name  |';
    }
    if (validateName(hospitalRef.current.value.trim())) {
      data.hospital = hospitalRef.current.value.trim();
    } else {
      valid = false;
      msg = msg + '|  Invalid Hospital  |';
    }

    if (valid == false) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    }
    data.gender = gender;

    await setData(data);
    await addDoctor(data);

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

  // * Adding to contract

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="doctor">Doctor's Name: </label>
        <input
          type="text"
          name="doctor"
          id="doctor"
          className="doctor"
          placeholder="Doctor's Name"
          ref={doctorsNameRef}
        />

        <label htmlFor="speciality">Speciality: </label>
        <input
          type="text"
          name="speciality"
          id="speciality"
          className="speciality"
          placeholder="Speciality"
          ref={specialityRef}
        />

        <div className={styles.rowForm} onChange={setGender}>
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" name="gender" value="Male" selected />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" name="gender" value="Female" />
        </div>

        <label htmlFor="number">Number: </label>
        <input
          type="tel"
          name="doctors-id"
          id="number"
          className="doctors-id"
          placeholder="Doctor's Number"
          ref={doctorsIDRef}
        />

        <label htmlFor="Hospital">Hospital: </label>
        <input
          type="text"
          name="hospital"
          id="hospital"
          className="hospital"
          placeholder="Hospital"
          ref={hospitalRef}
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
