import * as React from "react";
import {TextField} from "@material-ui/core";
import {TextFieldProps} from "@material-ui/core/TextField";
import {isFunction} from "lodash";
import {FormEventWithTargetValue, HTMLDivElementWithValue} from "../core/Interfaces";

export class ContentEditableField extends React.Component<TextFieldProps> {

    inputElement: HTMLDivElementWithValue;

    handleInputRef = (inputElement: HTMLDivElementWithValue) => {
        this.inputElement = inputElement
    };

    handleChange = (event: FormEventWithTargetValue<HTMLDivElement, string>) => {
        const {onInput} = this.props;
        this.inputElement.value = event.target.innerHTML;
        if (isFunction(onInput)) onInput(event);
    };

    render() {
        let {...props} = this.props;
        const {rows} = props;
        const inputProps = {
            contentEditable: true,
            style: rows ?
                {
                    height: `${Number(rows) * 20}px`
                } :
                null
        };
        const InputProps = {inputComponent: 'div'};

        return (
            <TextField
                {...props}
                inputProps={inputProps}
                InputProps={InputProps}
                inputRef={this.handleInputRef}
                onInput={this.handleChange}
            />
        );
    }
}