# Re-Chain

[Edit on StackBlitz ](https://stackblitz.com/edit/re-chain)

Re-chain is medical recordkeeper, based on Blockchain.

[Blockchain implementation](https://github.com/Via5k/Blockchain-Based-medical-Health-Records/) It uses the security of blockchain and the ease of web to update/create/store records on blockchain.

## View Medical Records

As we know medical history plays an important role and can be easily misused by anyone to hurt anyone. There is a Access control mechanism which allows only Doctor & Patient to access the records.

So, its simple, To View OR Add medical records of a patient, you will need to be a doctor.

## How to become a Doctor (Authorise/Unauthorise)

You can become a doctor by contacting the owner. The URL for the AdminPanel is -> https://re-chain.vercel.app/AdminPanel/

After visiting the page, you will have to pass the address of the doctor Address of the Doctor that wants to be authorised.

_Note:_ Only Owner can authorise or Unauthorise the doctors.

## How do i interact with this App?

To properly interact with this application there are certain requirements.

1. You will have to create a account on Metamask
2. Now, in Metamask, Goto Setting> Advance> Scroll to find (Show test networks) And, enable this.
3. Now Clicking on Ethereum Mainnet At the top you will see different options. Click on (Goerli Test Network)
4. We have done these 3 steps because the contracts are deployed on the Goerli Testnet. And it Uses Test Ether not Original Ether.
5. Now, To do anything you will need ETH (Ether) in your wallet, SO simply copy your wallet address.
6. [Visit](https://faucets.chain.link/goerli) and connect Your wallet and then click on send me 0.1Ether. Wait for a minute, your wallet will have 0.1 ETH. Now remember these are not the original Ether so they dont have any value.
7. Now if you are a Doctor then only you can interact with the App, So, if oyu are a Doctor, first login with the metamask and using the IDS, You can get the details.

## Where can i find Doctor/Patient IDS

Well, Doctor and Patient ID's are same as their phone number.

## Where are Reports Uploaded

Reports are uploaded to IPFS (decentralized File Sharing Platform).
_Note:_ Reports can be uploaded as PDF only.
