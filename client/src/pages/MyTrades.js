import React, { Component } from "react";
import {
    GFGCardHeader,
    GFGCardMeta,
    GFGCardDes,
    GFGImage,
} from "../components/GFGCard";
import { Card, Segment, Container } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
import GFGContainer from "../components/GFGContainer";
import { GFGButton } from "../components/GFGForm";
import { Row, Header, Button, Icon } from 'semantic-ui-react'
import { Divider, Grid, Image } from 'semantic-ui-react'
import MyTradeModal from '../components/GFGTradeModal'
import API from "../utils/API";
import Login from "./Login";
import GFGMenu from "../components/GFGMenu"
import GFGEditTradeModal from "../components/GFGEditTradeModal";
import "../components/GFGContainer/style.css";



class MyTrades extends Component {
    constructor(props) {
        super(props);
        this.loadUserTrades = this.loadUserTrades.bind(this);
        this.state = {
            trades: []
        }
    }

    componentDidMount() {
        console.log("Props from component mount", this.props);
        this.loadUserTrades();
    }

    loadUserTrades = () => {
        console.log("UserID IS", this.props.userId);
        API.getTradesByUserId(this.props.userId)
            .then(res => {
                this.setState({ trades: res.data });
            })
            .catch(err => {
                console.log(err)
            });
    }
    deleteUserTradeByID = (tradeId) => {
        console.log("tradeId IS", tradeId);
        API.deleteTradeByID(tradeId)
            .then((res) => {
                console.log('Student successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { isLoggedIn, userId, email, zipCode } = this.props;
        console.log("props in user dashboard", this.props);
        if (!isLoggedIn) {
            return <Redirect to="./Login" />
        }
        return (
            <GFGContainer id="Shadobox">
                <MyTradeModal userId={userId} email={email} zipCode={zipCode} loadUserTrades={this.loadUserTrades}>
                    <Grid>
                        <Grid.Column textAlign="center" style={{ marginTop: '25px' }}>
                            {isLoggedIn ? (<Button color="teal" size='huge'>
                                Add Trade
                            </Button>) : null}
                        </Grid.Column>
                    </Grid>
                </MyTradeModal>

                <Header textAlign="center" color="teal" size='huge'>My Trades</Header>
                {this.state.trades.map(newTrade =>
                    <Card fluid centered key={newTrade._id}>
                        <Card.Content>
                            <GFGCardHeader>Requested Item: {newTrade.reqItem}</GFGCardHeader>
                            <GFGCardDes> Requested Item Qty: {newTrade.reqItemQty} </GFGCardDes>
                            <GFGCardHeader>Available Item: {newTrade.availItem}</GFGCardHeader>
                            <GFGCardDes> Available Item Qty: {newTrade.availItemQty} </GFGCardDes>
                            <GFGEditTradeModal tradeToEdit={newTrade}><GFGButton color='teal'>Edit</GFGButton></GFGEditTradeModal>
                            <GFGButton color='red' onClick={() => this.deleteUserTradeByID(newTrade._id)}>Delete</GFGButton>
                        </Card.Content>
                    </Card>
                )}

            </GFGContainer>

        );
    }
}

export default MyTrades;
