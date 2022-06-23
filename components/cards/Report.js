import styles from '../../styles/cards.module.css';

const Report = ({ Data }) => {
  return (
    <>
      <div className={styles.card}>
        <br />
        <h3>Patient ID: {Data.patientsId}</h3>
        <h3>Doctors ID: {Data.updatedBy}</h3>
        <h3>Last Updated: {Data.lastUpdated}</h3>
        <h3>Prescription/Dosage: {Data.currentMedicalDosage}</h3>
        <h3>Diagnosis: {Data.diagnosis}</h3>
        {/* <h3>: {Data.pdf}</h3> */}
        <h3>
          Report: <a href={Data.pdf}>View Report</a>
        </h3>
      </div>
    </>
  );
};

export default Report;
