import Web3 from 'web3';
import GetMedicalInfo from '../ABIs/MedicalInfoAddGet.json';
import { useState, useEffect } from 'react';

const GetMedicalInfoABI = GetMedicalInfo.abi;
// const contractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F'; // localhost
const contractAddress = '0x9dC0c0Bc3c011a2b485c43b2B0394011193A3415'; // Goerli

const GetData = () => {
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
    const contract = await new web3.eth.Contract(
      GetMedicalInfoABI,
      contractAddress
    );

    const result = await contract.methods.getMedicalInfoDoctor(String(ID)).call(
      {
        from: account,
      },
      (err, result) => {
        if (err) {
          //show modal here displaying the error that was given by the EVM compiler
          // alert('Not Authorised! Sorry, Become a doctor!!');
          console.log(err);
        } else if (result) {
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
    const contract = await new web3.eth.Contract(
      GetMedicalInfoABI,
      contractAddress
    );

    const result = await contract.methods
      .getMedicalInfoPatient(String(ID))
      .call(
        {
          from: account,
        },
        (err, result) => {
          if (err) {
            //show modal here displaying the error that was given by the EVM compiler
            alert('Not Authorised! Sorry, Become a doctor!!');
            console.log(err);
          } else if (result) {
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
    //name , number, gender, address,dob,allergies
    return result;
  };

  const getReport = async (ID) => {
    await load();

    const account = await getCurrentAccount();
    const contract = await new web3.eth.Contract(
      GetMedicalInfoABI,
      contractAddress
    );

    const result = await contract.methods.getMedicalRecords(String(ID)).call(
      {
        from: account,
      },
      (err, result) => {
        if (err) {
          //show modal here displaying the error that was given by the EVM compiler
          // alert('Not Authorised! Sorry, Become a doctor!!');
          console.log(err);
        } else if (result) {
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

  return { load, getCurrentAccount, Account, getPatient, getDoctor, getReport };
};

export default GetData;
