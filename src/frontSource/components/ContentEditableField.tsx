import * as React from "react";
import {TextField} from "material-ui";
import {TextFieldProps} from "material-ui/TextField";
import {isFunction} from "lodash";
import {FormEventWithTargetValue, HTMLDivElementWithValue} from "../core/Interfaces";
import * as DropZone from "dropzone";

//ToDo: configure dropZone, connect it with form state and handle on server side
export interface ContentEditableFieldProps extends TextFieldProps {
    dropZoneOptions?: Dropzone.DropzoneOptions;
    dropZoneContainer?: HTMLElement;
}

export class ContentEditableField extends React.Component<ContentEditableFieldProps> {

    inputElement: HTMLDivElementWithValue;
    dropZone: DropZone;

    handleInputRef = (inputElement: HTMLDivElementWithValue) => {
        this.inputElement = inputElement
    };

    handleChange = (event: FormEventWithTargetValue<HTMLDivElement, string>) => {
        const {onInput} = this.props;
        this.inputElement.value = event.target.innerHTML;
        if (isFunction(onInput)) onInput(event);
    };

    componentWillReceiveProps(nextProps: ContentEditableFieldProps) {
        const {dropZoneOptions, dropZoneContainer} = nextProps;
        if (!this.dropZone && dropZoneContainer && dropZoneOptions && dropZoneOptions.hiddenInputContainer) {
            this.dropZone = new DropZone(
                dropZoneContainer,
                {
                    ...dropZoneOptions,
                    previewsContainer: this.inputElement
                }
            );
        }
    }

    render() {
        // Do not remove unused variables.
        let {dropZoneOptions, dropZoneContainer, ...props} = this.props;
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