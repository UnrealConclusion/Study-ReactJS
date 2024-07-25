import { Fragment } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



export default function CurrencyBox({input, onInput, selected, onSelected, marginTop}) {
    return (
        <Fragment>
            <InputGroup style={{marginTop: marginTop}}>
                <Form.Control aria-label="Currency Converter" value={input} onChange={event => onInput(event.target.value)}/>
  
                <DropdownButton variant="outline-secondary" align="end" title={selected} onSelect={selected => onSelected(selected)}>
                    <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
                    <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
                    <Dropdown.Item eventKey="CAD">CAD</Dropdown.Item>
                    <Dropdown.Item eventKey="INR">INR</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
        </Fragment>
    );
}