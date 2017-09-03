import * as React from "react";
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

interface IFieldGroupParams {
    id?: string,
    label?: string,
    help?: string,
    placeholder?: string,
    type?: string
}

/**
 * Custom field group element composed out of basic react-bootstrap components.
 * @param {string} id
 * @param {string} label
 * @param {string} help
 * @param {FieldGroup.props} props
 * @constructor
 */

export const FieldGroup = ({id, label, help, ...props}: IFieldGroupParams) =>
    <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>;
