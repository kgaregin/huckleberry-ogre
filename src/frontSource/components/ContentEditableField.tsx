import * as React from "react";
import {TextField} from "material-ui";
import {TextFieldProps} from "material-ui/TextField";
import {isFunction} from "lodash";
import {FormEventWithTargetValue, HTMLDivElementWithValue} from "../core/Interfaces";

export interface ContentEditableField {
    inputElement: HTMLDivElementWithValue;
}

export class ContentEditableField extends React.Component<TextFieldProps, ContentEditableField> {

    handleInputRef = (inputElement: HTMLDivElementWithValue) => this.setState({inputElement});

    handleChange = (event: FormEventWithTargetValue<HTMLDivElement, string>) => {
        const {onInput} = this.props;
        this.state.inputElement.value = event.target.innerHTML;
        if (isFunction(onInput)) onInput(event);
    };

    render() {
        let props = this.props;
        const {rows} = props;
        const inputProps = {
            contentEditable: true,
            style: rows ?
                {
                    height: `${Number(rows) * 20}px`
                } :
                null
        };
        const InputProps = {component: 'div'};

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