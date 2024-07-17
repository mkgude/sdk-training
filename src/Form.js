import React from "react";
import axios from 'axios'
import alloy from '@alloyidentity/web-sdk'

class Form extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            outcomeStatus : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.lengthValidate = this.lengthValidate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
      }

    async handleSubmit() {

        if(!this.lengthValidate(9, this.state.document_ssn)){
            window.alert('Validation error - Check the length of the SSN')

            return
        }

        if(!this.lengthValidate(10, this.state.phone_number)){
            window.alert('Validation error - Check the length of the Phone Number')

            return
        }
        console.log(this.state);
        const response = await axios.post('/evaluations', this.state)
        console.log("EVALUATIONS", response.data)
        

        this.setState({
          outcomeStatus : response.data.summary.outcome,
          entityToken : response.data.entity_token
        })

        console.log(this.state)
    }

    lengthValidate(expectedLength, entry) {
        if(entry.length !== expectedLength){
            return false
        }

        return true
    }


    render(){
        const outcome = this.state.outcomeStatus

        if(!outcome){
            return(

                    <body>
                        <div id="body_container">
                            <div id="input_container">
                                <div id="title_container">
                                    <h2 id="title_text"> 8-bit Financial </h2>
                             </div>
                                <div className="input_div">
                                    <input id="name_first" placeholder="First Name" onChange={this.handleChange}></input>
                                    <input id="name_last" placeholder="Last Name"  onChange={this.handleChange}></input>
                                </div>
                                <div className="input_div">
                                    <input id="document_ssn" placeholder="SSN" onChange={this.handleChange}></input>
                                    <input id="birth_date" placeholder="Birthdate" onChange={this.handleChange}></input>
                                </div>
                                <div className="input_div">
                                    <input id="email_address" placeholder="Email Address" onChange={this.handleChange}></input>
                                    <input id="phone_number" placeholder="Phone Number" onChange={this.handleChange}></input>
                                </div>
                                    <input id="address_line_1" placeholder="Street Address" onChange={this.handleChange}></input>
                                    <input id="address_line_2" placeholder="Apartment" onChange={this.handleChange}></input>
                                <div className="input_div">
                                    <input id="address_city" placeholder="City" onChange={this.handleChange}></input>
                                    <input id="address_state" placeholder="State (2 character)" onChange={this.handleChange}></input>
                                </div>
                                <div className="input_div">
                                    <input id="address_postal_code" placeholder="Postal Code" onChange={this.handleChange}></input>
                                </div>
                                <div id="button_container">
                                    <button id="submit_button" onClick={this.handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </body>

            )
        }

        if(outcome === 'Approved'){
            return(
                <div id="input_container">
                    <h3> Congratulations! You've been approved! </h3>
                </div>
            )
        } else if(outcome === 'Denied'){
            return(
                <div id="input_container">
                    <h3> I'm sorry! The bank account is in another castle! </h3>
                </div>
            )
        } else {
            const anchor = document.getElementById('sdk_anchor')

            const alloyInitParams = {
                key: "55926f62-901b-4fe1-a48d-15b3c518b9aa",
                entityToken: this.state.entityToken,
                documents: ['license', 'passport'],
                selfie: true,
                production: false,
                evaluationData: {
                    nameFirst: this.state.name_first,
                    nameLast: this.state.name_last,
                    addressLine1: this.state.address_line_1,
                    addressLine2: this.state.address_line_2,
                    addressCity: this.state.address_city,
                    addressState: this.state.address_state,
                    addressPostalCode: this.state.address_postal_code,
                    addressCountryCode: 'US',
                    birthDate: this.state.birth_date,
                },
                 color: { primary: '#CD7D2D', secondary: '#862633' },
                 forceMobile: true
            };
            alloy.init(alloyInitParams);

            const responseCallback = (data) => {
                this.setState({outcomeStatus : data.outcome})
            }

            alloy.open(responseCallback, anchor)


            return(
                <div id="sdk_anchor" />
            )


        }
    }
}

export default Form;
