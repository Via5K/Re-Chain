import Web3 from 'web3';
import MedicalInfo from '../ABIs/MedicalInfo.json';
import { useState, useEffect } from 'react';

const MedicalInfo = MedicalInfo.abi;
// const contractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F'; // localhost
const contractAddress = '0x9dC0c0Bc3c011a2b485c43b2B0394011193A3415'; // Goerli

const MedicalData = () => {
  const [Account, setAccount] = useState('');

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
  };
  const load = async () => {
    await loadWeb3();
  };
  const getCurrentAccount = async () => {
    const accounts = await window.web3.eth.getAccounts();
    setAccount(accounts[0]);
    return accounts[0];
  };

  const getDoctor = async (ID) => {
    await load();

    const account = await getCurrentAccount();
    const contract = await new web3.eth.Contract(MedicalInfo, contractAddress);

    const result = await contract.methods.getMedicalInfoDoctor(String(ID)).call(
      {
        from: account,
      },
      (err, result) => {
        if (err) console.log(err);
        if (result) {
          console.log(
            'GetData Result: ',
            result[0],
            result[1],
            result[2],
            result[3]
          );
        }
      }
    );
    console.log(JSON.stringify(result), result);
    // name, speciality, hospital, gender
    return result;
  };

  const getPatient = async (ID) => {
    await load();

    const account = await getCurrentAccount();
    const contract = await new web3.eth.Contract(MedicalInfo, contractAddress);

    const result = await contract.methods
      .getMedicalInfoPatient(String(ID))
      .call(
        {
          from: account,
        },
        (err, result) => {
          if (err) console.log(err);
          if (result) {
            console.log(
              'GetData Result: ',
              result[0],
              result[1],
              result[2],
              result[3],
              result[4],
              result[5]
            );
          }
        }
      );
    console.log(JSON.stringify(result), result);
    return result;
  };

  const getReport = async (ID) => {
    await load();

    const account = await getCurrentAccount();
    const contract = await new web3.eth.Contract(MedicalInfo, contractAddress);

    const result = await contract.methods.getMedicalRecords(String(ID)).call(
      {
        from: account,
      },
      (err, result) => {
        if (err) console.log(err);
        if (result) {
          console.log(
            'GetData Result: ',
            result[0],
            result[1],
            result[2],
            result[3],
            result[4],
            result[5]
          );
        }
      }
    );
    // lastUpdated, medicalDosage, UpdatedBy, diagnosis, PDF, allPDF
    console.log(JSON.stringify(result), result);
    return result;
  };

  // Add Data ---------------------------------------------------------------------------

  const addDoctor = async (Doctor) => {
    await load();

    const account = await getCurrentAccount();
    const contract = await new web3.eth.Contract(
      AddMedicalInfoABI,
      contractAddress
    );

    console.log(JSON.stringify(Doctor));

    const result = await contract.methods
      .addMedicalInfoDoctor(
        Doctor.doctorsName,
        Doctor.doctorsID,
        Doctor.speciality,
        Doctor.hospital,
        Doctor.gender
      )
      .send(
        {
          from: account,
        },
        (err, result) => {
          if (err) console.log(err);
          else if (result) console.log(result, JSON.stringify(result));
        }
      );
    console.log('Result', JSON.stringify(result));
  };

  const addPatient = async (Patient) => {
    await load();

    const account = await getCurrentAccount();
    const contract = await new web3.eth.Contract(
      AddMedicalInfoABI,
      contractAddress
    );

    console.log(JSON.stringify(Patient));

    const result = await contract.methods
      .addMedicalInfoPatient(
        Patient.patientsName,
        Patient.patientsID,
        Patient.number,
        Patient.gender,
        Patient.address,
        Patient.dob,
        Patient.allergies,
        Patient.address
      )
      .send(
        {
          from: account,
        },
        (err, result) => {
          if (err) console.log(err);
          else if (result) console.log(result, JSON.stringify(result));
        }
      );
    console.log('Result', JSON.stringify(result));
  };

  const addRecord = async (Report) => {
    await load();

    const account = await getCurrentAccount();
    const contract = await new web3.eth.Contract(
      AddMedicalInfoABI,
      contractAddress
    );

    console.log(JSON.stringify(Report));

    const result = await contract.methods
      .addMedicalRecords(
        Report.patientsID,
        Report.lastUpdated,
        Report.currentMedicalDosage,
        Report.updatedBy,
        Report.diagnosis,
        Report.pdf
      )
      .send(
        {
          from: account,
        },
        (err, result) => {
          if (err) console.log(err);
          else if (result) console.log(result, JSON.stringify(result));
        }
      );
    console.log('Result', JSON.stringify(result));
  };

  return {
    load,
    getCurrentAccount,
    Account,
    getPatient,
    getDoctor,
    getReport,
    addDoctor,
    addPatient,
    addRecord,
  };
};

export default MedicalData;
