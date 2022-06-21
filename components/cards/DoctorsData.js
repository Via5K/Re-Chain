import styles from '../../styles/cards.module.css';

const DoctorsData = ({ Doctor }) => {
  // console.log('DD:5', JSON.stringify(Doctor));
  if (Doctor === undefined || Doctor.length == 0) {
    return (
      <div className={styles.card}>
        <br />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.card}>
          <br />
          <h3>Name: {Doctor.doctorsName}</h3>
          <h3>Speciality: {Doctor.speciality}</h3>
          <h3>Hospital: {Doctor.hospital}</h3>
          <h3>Gender: {Doctor.gender}</h3>
        </div>
      </>
    );
  }
};

export default DoctorsData;
