import Web3 from 'web3';
import AddMedicalInfo from '../ABIs/MedicalInfoAddGet.json';
import { useState, useEffect } from 'react';

const AddMedicalInfoABI = AddMedicalInfo.abi;
const contractAddress = '0x9dC0c0Bc3c011a2b485c43b2B0394011193A3415'; // Goerli
// const contractAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'; // localhost

const AddData = () => {
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
          if (err) {
            //show modal here displaying the error that was given by the EVM compiler
            alert('Not Authorised! Sorry, Become a doctor!!');
            console.log(err);
          } else if (result) console.log(result, JSON.stringify(result));
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
        Patient.walletAddress //this one is new
      )
      .send(
        {
          from: account,
        },
        (err, result) => {
          if (err) {
            //show modal here displaying the error that was given by the EVM compiler
            alert('Not Authorised! Sorry, Become a doctor!!');
            console.log(err);
          } else if (result) console.log(result, JSON.stringify(result));
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
          if (err) {
            //show modal here displaying the error that was given by the EVM compiler
            alert('Not Authorised! Sorry, Become a doctor!!');
            console.log(err);
          } else if (result) console.log(result, JSON.stringify(result));
        }
      );
    console.log('Result', JSON.stringify(result));
  };

  return { Account, addDoctor, addPatient, addRecord };
};

export default AddData;
