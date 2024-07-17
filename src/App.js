import React, { useState, useEffect } from 'react';
import alloy from '@alloyidentity/web-sdk';
import './App.css';

function App() {
  const [nidSiteId, setNidSiteId] = useState('');
  const [nidUserId, setNidUserId] = useState('');
  const [blackboxToken, setBlackboxToken] = useState('');
  const [socureDeviceID, setSocureDeviceID] = useState('');
  const [nameFirst, setNameFirst] = useState('');
  const [nameLast, setNameLast] = useState('');
  const [dOB, setDOB] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressCountry, setAddressCountry] = useState('');
  const [addressPostalCode, setAddressPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [ssn, setSSN] = useState('');
  const [email, setEmail] = useState('');

  const alloyInitParams = {
    "key": "",
    "journeyToken": "",
    "socurePublicToken": "",
    "color": {
      "primary": "#CD7D2D",
      "secondary": "#862633"
    },
    "customStyle": null
  };

  // Run when the page opens for NeuroID, if only using socure/iovation remove this piece as you do not need to run when the page opens
  useEffect(() => {
    async function initializeAlloy() {
      const init = await alloy.init(alloyInitParams);
      const { neuroIdSiteId, neuroUserId, iovationBlackboxId, socureDeviceId } = init;
      setNidSiteId(neuroIdSiteId);
      setNidUserId(neuroUserId);
      setBlackboxToken(iovationBlackboxId);
      setSocureDeviceID(socureDeviceId);
    }
    initializeAlloy();
    return () => {
      alloy.close();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const startApp = () => {
    // Start app functionality
    setNameFirst('Tina');
    setNameLast('Marie');
    setDOB('1990-09-09');
    setAddressStreet('123 A Street');
    setAddressCity('Brooklyn');
    setAddressState('NY');
    setAddressCountry('US');
    setAddressPostalCode('11111');
    setPhone('+18828888888');
    setSSN('888888888');
    setEmail('tina.marie@gmail.com');
    console.log('App Started');
  }

  const submitApp = async() => {
    
    //   Run below code if only using iovation and socure as they only need to be run at the end of the application process to gather the values.
    //   const init = await alloy.init(alloyInitParams);
    //   const { iovationBlackboxId, socureDeviceId } = init;
    //   setBlackboxToken(iovationBlackboxId);
    //   setSocureDeviceID(socureDeviceId);

    // return () => {
    //   alloy.close();
    // };
    // Submit app functionality
    runPayload();
  }

  // Use code below if only using iovation and socure to check for values before running payload and submitting to API
  // useEffect(() => {
  //   if (blackboxToken && socureDeviceID) {
  //   runPayload();
  //   }
  //   }, [blackboxToken, socureDeviceID]);

  const runPayload = () => {
    const payload = {
      name_first: nameFirst,
      name_last: nameLast,
      birth_date: dOB,
      addresses: {
        line_1: addressStreet,
        city: addressCity,
        state: addressState,
        country: addressCountry,
        postal_code: addressPostalCode,
      },
      phone_number: phone,
      document_ssn: ssn,
      email_address: email,
      site_id: nidSiteId,
      neuro_user_id: nidUserId,
      iovation_blackbox: blackboxToken,
      socure_session_id: socureDeviceID
    };

    console.log('payload', payload);
    alloy.close();
  }

  return (
    <div className="App">
      <div className="buttonContainer">
        <button className="fillButton" onClick={startApp}>Fill</button>
      </div>
      <div className='container'>
        <div className="formContainer">
          <div className="formBox formLeft">
            <div className="formElement">First Name: {nameFirst}</div>
            <div className="formElement">Last Name: {nameLast}</div>
            <div className="formElement">Phone Number: {phone}</div>
            <div className="formElement">SSN: {ssn}</div>
            <div className="formElement">Email: {email}</div>
            <div className="formElement">DOB: {dOB}</div>
          </div>
          <div className="formBox formRight">
            <div className="formElement">Street: {addressStreet}</div>
            <div className="formElement">City: {addressCity}</div>
            <div className="formElement">State: {addressState}</div>
            <div className="formElement">Country: {addressCountry}</div>
            <div className="formElement">Postal Code: {addressPostalCode}</div>
          </div>
        </div>
        <div className="buttonContainer">
          <button className="submitButton" onClick={submitApp}>Submit</button>
        </div>
      </div>

      <div className="responseContainer">
        <div className="column columnNID">
          <div className="responseNIDSiteId">Neuro Site ID: {nidSiteId}</div>
          <div className="responseNIDUserID">Neuro User ID: {nidUserId}</div>
        </div>
        <div className="column columnSocure">
          <div className="responseSocureDeviceID">Socure Session ID: {socureDeviceID}</div>
        </div>
        <div className="column columnIovation">
          <div className="responseBlackboxToken">Iovation Blackbox Token: {blackboxToken}</div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
