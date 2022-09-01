import { useRef, useState } from 'react';
import { validateID } from './validations.js';
import styles from '../../styles/Forms.module.css';
import Card from '../../styles/cards.module.css';
import PatientData from '../cards/PatientData.js';
import DoctorsData from '../cards/DoctorsData.js';
import Report from '../cards/Report.js';
import MedicalData from '../scripts/MedicalData.js';
import Modal from '../cards/Modal';

export default function ReportDataForm() {
  const [ID, setID] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong ⁉️ ');
  let msg;

  const [Patient, setPatient] = useState({
    patientsID: '',
    patientsName: '',
    number: '',
    gender: '',
    address: '',
    dob: '',
    allergies: '',
  });

  const [Doctor, setDoctor] = useState({
    doctorsID: '',
    doctorsName: '',
    speciality: '',
    hospital: '',
    gender: '',
  });

  const [Reports, setReports] = useState({
    patientsID: '',
    lastUpdated: '',
    currentMedicalDosage: '',
    updatedBy: '',
    diagnosis: '',
    pdf: '',
    pdfAll: '',
  });

  const IDRef = useRef();

  const { getPatient, getReport, getDoctor } = MedicalData();

  const getPatientData = async () => {
    // e.preventDefault();
    // if (!validateID(IDRef.current.value.trim())) return false;
    // await setID(IDRef.current.value.trim());

    const result = await getPatient(IDRef.current.value);

    const data = { ...Patient };
    data.patientsID = IDRef.current.value;
    data.patientsName = result[0];
    data.number = result[1];
    data.gender = result[2];
    data.address = result[3];
    data.dob = result[4];
    let allergies = result[5];

    if (data.patientsName == '' || data.patientsName == undefined) {
      msg = `No patient with id ${IDRef.current.value}`;
      await setMessage(msg);
      await setShowModal(true);
      return false;
    }

    for (let i = 11; i < allergies.length; i++) {
      data.allergies += allergies[i];
    }

    await setPatient(data);
    return true;
  };

  const getDoctorData = async (id) => {
    const result = await getDoctor(id);

    const doctor = { ...Doctor };
    doctor.doctorsID = id;
    doctor.doctorsName = result[0];
    doctor.speciality = result[1];
    doctor.hospital = result[2];
    doctor.gender = result[3];
    await setDoctor(doctor);
  };

  const handleReport = async (e) => {
    e.preventDefault();

    msg = `Processing Request: Please wait`;
    await setMessage(msg);
    await setShowModal(true);
    setTimeout(() => {
      msg = 'Invalid Input: Please enter valid input values ⁉️  ';
      setShowModal(false);
      setMessage(msg);
    }, 5000);

    let msg = 'Invalid Input: Please enter valid ID ⁉️  ';
    if (!validateID(IDRef.current.value)) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    }
    const data = { ...Reports };
    const patient = await getPatientData();

    if (patient == false) return;

    const result = await getReport(IDRef.current.value);
    data.patientsID = IDRef.current.value;
    data.lastUpdated = result[0];
    data.currentMedicalDosage = result[1];
    data.updatedBy = result[2];
    data.diagnosis = result[3];
    data.pdf = result[4];
    data.pdfAll = result[5];
    if (
      data.pdf == '' ||
      data.pdf == undefined ||
      data.updatedBy == '' ||
      data.updatedBy == undefined
    ) {
      msg = `No report uploaded for patient ${Patient.patientsName} with id: ${IDRef.current.value}⁉️`;
      await setMessage(msg);
      await setShowModal(true);
      return;
    }
    await setReports(data);

    await getDoctorData(data.updatedBy);

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
      <form className={styles.form} onSubmit={handleReport}>
        <label htmlFor="id">Patient's ID: </label>
        <input
          type="text"
          placeholder="Patient ID"
          id="id"
          ref={IDRef}
          required
        />
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>

      <br />
      <div className={Card.card}>
        <h2 className={Card.head}>Doctor</h2>
      </div>
      <DoctorsData Doctor={Doctor} />

      <br />
      <div className={Card.card}>
        <h2 className={Card.head}>Patient</h2>
      </div>
      <PatientData Patient={Patient} />

      <br />
      <div className={Card.card}>
        <h2 className={Card.head}>Report</h2>
      </div>
      <Report Data={Reports} />

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
