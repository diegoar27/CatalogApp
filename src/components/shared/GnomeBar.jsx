import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Nav, Navbar, Form, Col, Button } from 'react-bootstrap';

import './gnomebar.style.scss';
var logoImg = require('../../resources/logo.png');

export default class GnomeBar extends Component{
    static propTypes = {
        cityTitle: PropTypes.string,
        professionList: PropTypes.array.isRequired,
        onSearchClick: PropTypes.func.isRequired,
        onShowAll: PropTypes.func.isRequired,
        onOrderByFriendlies: PropTypes.func.isRequired,
        onOrderByWorkaholic: PropTypes.func.isRequired,
    }
    static defaultProps = {
        cityTitle: "Brastlewark",
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedProfession: undefined
        };
    
        this.handleProfiessionFilterChange = this.handleProfiessionFilterChange.bind(this);
        this.handleOnSearchClick = this.handleOnSearchClick.bind(this);
        this.handleOnWorkaholicSelect = this.handleOnWorkaholicSelect.bind(this);
        this.handleOnFriendliesSelect = this.handleOnFriendliesSelect.bind(this);
        this.handleOnCitySelect = this.handleOnCitySelect.bind(this);
    }

    componentDidMount() {
        this.setState({selectedProfession: this.props.professionList[0]});
    }

    handleProfiessionFilterChange(e) {
        this.setState({selectedProfession: e.target.value});
    }

    handleOnSearchClick(){
        let profession = this.state.selectedProfession;
        if (!profession){
            profession = this.props.professionList[0];
        }
        this.props.onSearchClick(profession);
    }

    handleOnCitySelect() {
        this.props.onShowAll();
    }

    handleOnWorkaholicSelect() {
        this.props.onOrderByWorkaholic();
    }

    handleOnFriendliesSelect() {
        this.props.onOrderByFriendlies();
    }

    render() {
        return (
            <div className="gnome-navbar">
                <Navbar bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand href="#home" onSelect={this.handleOnCitySelect}>
                        <img
                        alt=""
                        src={logoImg}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />
                        {this.props.cityTitle}
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" onSelect={this.handleOnCitySelect}>All</Nav.Link>
                        <Nav.Link href="#home" onSelect={this.handleOnWorkaholicSelect}>Whorkaholics</Nav.Link>
                        <Nav.Link href="#home" onSelect={this.handleOnFriendliesSelect}>Friendlies</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Form.Group>
                            <Form.Label className="label-professions">Filter by profession </Form.Label>
                            <Form.Control className="select-professions" as="select" onChange={this.handleProfiessionFilterChange}>
                                {this.props.professionList.map(profession => <option>{profession}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="outline-info" onClick={this.handleOnSearchClick}>Search</Button>
                    </Form>
                </Navbar>
            </div>
        );
    }
}