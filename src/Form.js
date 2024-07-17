import React from 'react';
import alloy from '@alloyidentity/web-sdk';
import './Form.css';

const alloyInitParams = {
    "key": "c76e2459-6772-4de5-9a23-8628710ce802",
    "journeyToken": "J-KqMDE7j3Va3sD20w7oTD",
    "journeyApplicationToken": "JA-vAabsmvoEgiDfhV0z2El",
    // "entityToken": "P-XMbZH22GMhJf2cqW2bnd",
    // "production": false,
    // "isSingleEntity": true,
    // "externalEntityId": "c2bf0945-3142-4f16-92e9-0e7c0dca856a",
    "color": {
        "primary": "#CD7D2D",
        "secondary": "#862633"
    },
    "customStyle": null
};
alloy.init(alloyInitParams);


function App() {
  //  // This is a sample callback function. This function can be passed into the open function, and will be exectuted when the SDK closes

  const onOpen = async() => {
    const anchorElementSelected = document.getElementById('anchors');
    const anchorElement =
      anchorElementSelected.options[anchorElementSelected.selectedIndex].value;
    // Open the SDK. The "open" function allows the use of an optional parameter to mount the alloy modal inside a div identified by its ID or class name.
    // If not specified, it'll be absolute positioned in the middle of the document.
    const init = await alloy.init(alloyInitParams);
      // If using Iovation or NeuroID, you can retrieve the needed fields from the returned object, when using Alloy's init function
      console.log("init-->", init);
      console.log('anchorelement', anchorElement);
    alloy.open(callback, anchorElement);

  };
  const callback = data => {
    console.log(data);
  };

  const onClose = () => {
    alloy.close();
  };

  return (
    <>
      <div className="App">
          <div className="buttonContainer">
            <div>
                <select name="anchors" id="anchors">
                <option value={undefined}>No anchor</option>
                <option value="anchorElementContainer1">Left anchor</option>
                <option value="anchorElementContainer2">Right anchor</option>
                <option value="anchorElementContainer3">Bottom anchor</option>
                </select>
            </div>
            <div className='buttons'>
                <button className="button openButton" onClick={onOpen}>Open</button>
                <button className="button closeButton" onClick={onClose}>Close</button>
            </div>
            
          </div>
        </div>
    </>
  );
}

export default App;