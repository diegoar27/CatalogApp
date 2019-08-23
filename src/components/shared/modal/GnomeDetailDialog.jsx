import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import Image from 'react-shimmer';

import './gnomeDetailDialog.style.scss';

export default class GnomeDetailDialog extends Component{
    static propTypes = {
        gnome: PropTypes.object,
        show: PropTypes.bool.isRequired,
        onCloseClick: PropTypes.func.isRequired,
    }

    static defaultProps = {
        gnome: {},
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleCloseClick() {
        this.props.onCloseClick();
    }

    render(){
        const { gnome, show } = this.props;
        return (
        <Modal show={show} onHide={this.handleCloseClick}>
            <Modal.Header closeButton>
                <Modal.Title>{gnome.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="show-grid">
                        <Col xs={12} md={12} style={{ textAlign: 'center' }} >
                            <Image
                                className="gnome-card-img"
                                src={gnome.thumbnail}
                                width={281} height={175}
                                style={{ objectFit: 'contain' }} 
                            />
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} md={12}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><span>Age: </span>{gnome.age}</ListGroup.Item>
                                <ListGroup.Item><span>Weight: </span>{gnome.weight}</ListGroup.Item>
                                <ListGroup.Item><span>Height: </span>{gnome.height}</ListGroup.Item>
                                <ListGroup.Item><span>Hair Color: </span>{gnome.hairColor}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseClick}>Close</Button>
            </Modal.Footer>
        </Modal>);
    }
}