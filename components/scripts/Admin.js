import Web3 from 'web3';
import { useState } from 'react';
import AddMedicalInfo from '../ABIs/AddMedicalInfo.json';
import GetMedicalInfo from '../ABIs/GetMedicalInfo.json';

const AddMedicalInfoABI = AddMedicalInfo.abi;
const GetMedicalInfoABI = GetMedicalInfo.abi;
const addContractAddress = '0xB179ab9d325DFc545CfB69fC136Ef395f60482cb'; // Goerli
const getContractAddress = '0x19b1970917E1Ec7D627924B65aaD0F4eac3BaD3b'; // Goerli

const Admin = () => {
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

  //Add Authentication , Add As Doctor
  async function addAuthentication(doctorAddress) {
    load();
    const account = await getCurrentAccount();
    const addAuth = await new web3.eth.Contract(
      AddMedicalInfoABI,
      addContractAddress
    );
    const getAuth = await new web3.eth.Contract(
      GetMedicalInfoABI,
      getContractAddress
    );
    web3.utils.checkAddressChecksum(doctorAddress);
    web3.utils.isAddress(doctorAddress);
    console.log(doctorAddress);
    const resultAdd = await addAuth.methods
      .addAuthorisedDoctor(doctorAddress)
      .send(
        {
          from: account,
        },
        function (err, resultAdd) {
          if (err) {
            console.log(err);
          }
          if (resultAdd) console.log(resultAdd);
        }
      );

    const resultGet = await getAuth.methods
      .addAuthorisedDoctor(doctorAddress)
      .send(
        {
          from: account,
        },
        function (err, resultGet) {
          if (err) {
            console.log(err);
          }
          if (resultGet) {
            console.log(resultGet);
          }
        }
      );
  }

  //remove Authentication, Remove from post of Doctor.
  async function removeAuthentication(removeAddressDoctor) {
    load();
    const account = await getCurrentAccount();

    console.log(removeAddressDoctor);

    const addAuth = await new web3.eth.Contract(
      AddMedicalInfoABI,
      addContractAddress
    );
    const getAuth = await new web3.eth.Contract(
      GetMedicalInfoABI,
      getContractAddress
    );
    const resultAdd = await addAuth.methods
      .removeAuthorisedDoctor(removeAddressDoctor)
      .send(
        {
          from: account,
        },
        function (err, resultAdd) {
          if (err) {
            console.log(err);
          }
        }
      );

    const resultGet = await getAuth.methods
      .removeAuthorisedDoctor(removeAddressDoctor)
      .send(
        {
          from: account,
        },
        function (err, resultGet) {
          if (err) {
            console.log(err);
          }
          if (resultGet) console.log(resultGet);
        }
      );
  }

  return { addAuthentication, removeAuthentication };
};

export default Admin;
