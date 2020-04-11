import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { GFGButton, GFGInput, GFGLabel, GFGTextArea, GFGDropdown } from "../components/GFGForm";
import { Form, Divider, Grid, Header } from "semantic-ui-react";
import GFGContainer from "../components/GFGContainer";
import API from "../utils/API";

class AddFeed extends Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            zipCode: "",
            storeName: "",
            description: "",
            redirect: null,
            fullStock: ""
        }
    }





    handleInputChange = (event) => {
        const { name, value, } = event.target;
        this.setState({
            [name]: value,
        });
        console.log("State is", this.state)
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };



    render() {
        const options = [
            { key: "1", text: "Yes", value: "FULL" },
            { key: "2", text: "No", value: "NOT_FULL" }
        ];
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <GFGContainer>
                <Form>
                    <Form.Field>
                        <GFGLabel>Store Name</GFGLabel>
                        <GFGInput
                            value={this.state.storeName}
                            onChange={this.handleInputChange}
                            name="storeName"
                            placeholder="Enter the Store Name"
                        />
                    </Form.Field>
                    <Form.Field>
                        <GFGLabel>Store Name</GFGLabel>
                        <GFGTextArea
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            name="description"
                            placeholder="Enter list of products"
                        />
                    </Form.Field>
                    <Form.Field>
                        <GFGLabel>Fully stocked shelves?</GFGLabel>
                        <GFGDropdown
                            value={this.state.fullStock}
                            onChange={this.handleInputChange}
                            selection
                            name="fullStock"
                            text="Select One"
                            options={options}
                        />
                    </Form.Field>


                    <GFGButton
                        color="teal"
                        disabled={!(this.state.zipCode)}
                        onClick={this.handleFormSubmit}
                    >
                        Submit Feed
                                </GFGButton>
                </Form>

            </GFGContainer>
        );
    }
}

export default AddFeed;