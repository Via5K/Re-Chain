import styles from '../../styles/cards.module.css';

const PatientData = ({ Patient }) => {
  return (
    <>
      <div className={styles.card}>
        <br />
        <h3>Name: {Patient.patientsName}</h3>
        <h3>Phone: {Patient.number}</h3>
        <h3>DOB: {Patient.dob}</h3>
        <h3>Gender: {Patient.gender}</h3>
        <h3>Address: {Patient.address}</h3>
        <h3>Allergies: {Patient.allergies}</h3>
        {/* <h3>Wallet Address: {Patient.walletAddress}</h3> */}
      </div>
    </>
  );
};

export default PatientData;
