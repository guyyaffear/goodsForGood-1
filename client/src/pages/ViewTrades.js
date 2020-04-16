import React, { Component } from "react";
import {
    GFGCardHeader,
    GFGCardMeta,
    GFGCardDes,
    GFGImage,
} from "../components/GFGCard";
import { Card, Segment, Container, Modal, Form } from "semantic-ui-react";
import GFGContainer from "../components/GFGContainer";
import { GFGButton, GFGInput, GFGLabel, GFGTextArea } from "../components/GFGForm";
import { Row, Header, Button, Icon } from 'semantic-ui-react'
import { Divider, Grid, Image } from 'semantic-ui-react'
import API from "../utils/API";
import { GFGModalHeader, GFGModalContent, GFGModalDesc } from "../components/GFGModal";
import { socket } from "../components/GFGNavbar";
import "../components/GFGContainer/style.css";



class ViewTrades extends Component {
    constructor(props) {
        super(props);
        this.loadUserTrades = this.loadUserTrades.bind(this);
        this.state = {
            trades: [],
            message: "",
            modalOpen: false
        }
    }

    componentDidMount() {
        console.log("Props from component mount", this.props);
        this.loadUserTrades();
    }

    handleClose = () => this.setState({ modalOpen: false })
    handleOpen = () => this.setState({ modalOpen: true })


    handleInputChange = (event) => {
        const { name, value, } = event.target;
        this.setState({
            [name]: value,
        });
    };
    loadUserTrades = () => {
        console.log("UserID IS", this.props.userId);
        if (!this.props.userId) {
            API.getAllTradesByLoc(this.props.zipCode)
                .then(res => {
                    this.setState({ trades: res.data });
                })
                .catch(err => {
                    console.log(err)
                });
        }
        else {
            API.getFilteredTrades(this.props.zipCode, this.props.userId)
                .then(res => {
                    this.setState({ trades: res.data });
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    addFav = (tradeId) => {
        console.log("Trade ID", tradeId);
        console.log("User ID is", this.props.userId);
        var data = {
            userId: this.props.userId,
            tradeId: tradeId
        }
        console.log("Data passed to API is ", data);
        API.addToFavorites(data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    sendMessage = (messageReceiverId, tradeId) => {
        console.log(this.state.message);
        const messageSenderId = this.props.userId;
        const senderName = this.props.username;
        console.log("senderName", senderName);
        console.log("Receiver id", messageReceiverId, "Sender id is", messageSenderId, "trade Id is", tradeId);
        if (!this.props.userId) return;
        // socket.on("message", (messageSenderId, messageReceiverId) => {
        // this.transmitMessage(this.state.message, messageSenderId, messageReceiverId)

        socket.emit("new message", {
            message: this.state.message,
            sender: messageSenderId,
            senderName: senderName,
            receiver: messageReceiverId,
            tradeId: tradeId
        })
        this.loadUserTrades();
    }

    render() {
        const { isLoggedIn, username, userId, email, zipCode } = this.props;
        console.log("Props in view trades", this.props);
        return (
            <GFGContainer id="Shadobox">
                <Grid >
                    {/* ui centered grid */}
                    <Header textAlign='center' color="teal" size='huge'>All Trades in my neighborhood</Header>

                    <Grid.Row>

                        {this.state.trades.map(newTrade =>
                            <Card fluid key={newTrade._id} id="Shadobox" >
                                <Card.Content>
                                    <GFGCardHeader>Requested Item: {newTrade.reqItem}</GFGCardHeader>
                                    <GFGCardHeader> Requested Item Qty: {newTrade.reqItemQty} </GFGCardHeader>
                                    <GFGCardHeader>Available Item: {newTrade.availItem}</GFGCardHeader>
                                    <GFGCardHeader> Available Item Qty: {newTrade.availItemQty} </GFGCardHeader>
                                    {(isLoggedIn) ? (<Form reply>
                                        <Form.TextArea value={this.state.message}
                                            placeholder="Enter a message and click send Message to contact owner"
                                            onChange={this.handleInputChange}
                                            name="message" />
                                    </Form>) : null}
                                </Card.Content>
                                {(isLoggedIn) ? (<Card.Content extra>
                                    <GFGButton color='teal' onClick={() => this.sendMessage(newTrade.userId, newTrade._id)}>Send Message</GFGButton>
                                    <GFGButton color='green' onClick={() => this.addFav(newTrade._id)}>Add to Favorites </GFGButton>

                                </Card.Content>) : null}
                            </Card>
                        )}
                    </Grid.Row>
                </Grid>
            </GFGContainer>
        );
    }
}

export default ViewTrades;
