import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import data from '../data/areas.json';

class Homepage extends React.Component {
  renderArea(area) {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <h3>{area.name}</h3>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <p>Tasks here.</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

  render() {
    const { areas } = data;
    return <Accordion>{areas.map((area) => this.renderArea(area))}</Accordion>;
  }
}

export default Homepage;
