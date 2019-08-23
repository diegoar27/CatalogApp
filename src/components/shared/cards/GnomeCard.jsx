import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Card, Badge, Button } from 'react-bootstrap';
import Image from 'react-shimmer';

import './gnomeCard.style.scss';

export default class GnomeCard extends Component{
    static propTypes = {
        gnome: PropTypes.object.isRequired,
        onDetailClick: PropTypes.func.isRequired,
        // onFriendClick: PropTypes.func.isRequired,
        // onProfessionClick: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
            
        this.handleGnomeCardDetailClick = this.handleGnomeCardDetailClick.bind(this);
      }
    
    handleGnomeCardDetailClick() {
        this.props.onDetailClick(this.props.gnome.id)
    }

    render() {
        const { gnome } = this.props;
        
        return (
            <div className="gnome-card">
                <Card>
                    <Card.Img as={Image}
                        className="gnome-card-img"
                        src={gnome.thumbnail}
                        width={281} height={175}
                        style={{ objectFit: 'contain' }}
                    />
                    <Card.Body>
                        <Card.Title className="gnome-card-title">
                            <Button variant="link" onClick={this.handleGnomeCardDetailClick}>{gnome.name}</Button>
                        </Card.Title>
                        <Card.Text>
                            <h6>Professions</h6>
                            {gnome.professions.map(prof =>  <Badge pill variant="secondary">{prof}</Badge>)}
                            <h6>Friends</h6>
                            {gnome.friends.map(friend =>  <Badge pill variant="primary">{friend}</Badge>)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}