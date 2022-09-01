import { useRef, useState } from 'react';
import { validateID, validateName, validateFile } from './validations.js';
import styles from '../../styles/Forms.module.css';
import AddData from '../scripts/AddData.js';
import Modal from '../cards/Modal';
import useStorage from '../hooks/useStorage';

export default function ReportForm() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong ⁉️ ');

  const { uploadFile } = useStorage();

  const [Data, setData] = useState({
    patientsID: '',
    lastUpdated: '',
    currentMedicalDosage: '',
    updatedBy: '',
    diagnosis: '',
    pdf: '',
  });

  const patientsIDRef = useRef();
  const doctorsIDRef = useRef();
  const diagnosisRef = useRef();
  const prescriptionRef = useRef();
  const dobRef = useRef();
  const fileRef = useRef();

  const { addRecord } = AddData();

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
    let msg = '';
    let data = { ...Data };

    if (validateID(patientsIDRef.current.value.trim()))
      data.patientsID = patientsIDRef.current.value;
    else {
      valid = false;
      msg = msg + "   Invalid Patient's ID   |";
    }
    if (validateID(doctorsIDRef.current.value.trim()))
      data.updatedBy = doctorsIDRef.current.value;
    else {
      valid = false;
      msg = msg + "   Invalid Doctor's ID  |";
    }

    if (validateName(diagnosisRef.current.value.trim()))
      data.diagnosis = diagnosisRef.current.value;
    else {
      valid = false;
      msg = msg + '   Invalid Diagnosis  |';
    }

    if (validateName(prescriptionRef.current.value.trim()))
      data.currentMedicalDosage = prescriptionRef.current.value;
    else {
      valid = false;
      msg = msg + '   Invalid Prescription  |';
    }

    data.lastUpdated = String(dobRef.current.value);
    if (
      data.lastUpdated == null ||
      data.lastUpdated == undefined ||
      data.lastUpdated == ''
    ) {
      valid = false;
      msg = msg + '   Invalid Date  |';
    }

    const file = fileRef.current.value;
    if (!validateFile(file)) {
      msg = msg + '   Invalid file  |';
    } else {
      const cid = await uploadFile(fileRef.current);
      data.pdf = `https://dweb.link/ipfs/${cid}`;
    }

    // data.pdf = 'bafybeifynkhsnf63nsriir56zdox3fa5o62hejotpj3zzpemzztceiqauy';
    await setData(data);

    if (valid == false) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    } else {
      msg = `Uploading data to Ethereum Blockchain will take a minute. 
      Please wait...`;
      await setMessage(msg);
      await setShowModal(true);
    }

    await addRecord(data);
    await setMessage(`Data uploaded on Ethereum Blockchain`);
    setShowModal(false);

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
        <label htmlFor="id">Doctor ID: </label>
        <input
          type="text"
          name="doctor"
          id="doctor"
          className="doctor"
          placeholder="Doctor's ID"
          ref={doctorsIDRef}
        />

        <label htmlFor="patient-id">Patient ID: </label>
        <input
          type="text"
          name="patient-id"
          id="patient-id"
          className="patient-id"
          placeholder="Patient ID"
          ref={patientsIDRef}
        />

        <label htmlFor="diagnosis">Diagnosis: </label>
        <textarea
          name="diagnosis"
          id="diagnosis"
          cols="20"
          rows="4"
          placeholder="Diagnosis :"
          ref={diagnosisRef}
        ></textarea>

        <label htmlFor="prescription">Prescription: </label>
        <textarea
          name="prescription"
          id="prescription"
          cols="20"
          rows="4"
          placeholder="Prescription :"
          ref={prescriptionRef}
        ></textarea>
        <div className={styles.rowForm}>
          <label htmlFor="dob">Report Updated on: </label>
          <input type="date" id="dob" name="dob" ref={dobRef} />
        </div>
        <div className={styles.rowForm}>
          <input
            type="file"
            id="report"
            name="report"
            accept=".pdf"
            ref={fileRef}
          />
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>

        {/* <div className={styles.state}>
          <span>{JSON.stringify(Data)}</span>
        </div> */}
      </form>
      <section>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            {Message}
          </Modal>
        )}
      </section>
    </>
  );
}
