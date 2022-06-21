import { useRef, useState } from 'react';
import { validateID } from './validations.js';
import styles from '../../styles/Forms.module.css';
import PatientData from '../cards/PatientData.js';
import DoctorsData from '../cards/DoctorsData.js';
import Report from '../cards/Report.js';
import GetData from '../scripts/GetData.js';
import Modal from '../cards/Modal';

export default function ReportDataForm() {
  const [ID, setID] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong ⁉️ ');

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

  const { getPatient, getReport, getDoctor } = GetData();

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

    for (let i = 11; i < allergies.length; i++) {
      data.allergies += allergies[i];
    }

    await setPatient(data);
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

    let msg = 'Invalid Input: Please enter valid ID ⁉️  ';
    if (!validateID(IDRef.current.value)) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    }
    const data = { ...Reports };
    const result = await getReport(IDRef.current.value);
    data.lastUpdated = result[0];
    data.currentMedicalDosage = result[1];
    data.updatedBy = result[2];
    data.diagnosis = result[3];
    data.pdf = result[4];
    data.pdfAll = result[5];
    await setReports(data);

    await getPatientData();
    await getDoctorData(data.updatedBy);
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

      <DoctorsData Doctor={Doctor} />
      <PatientData Patient={Patient} />
      <Report Data={Reports} />
    </>
  );
}
