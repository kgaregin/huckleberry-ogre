import * as React from "react";
import {TextField, Button} from "material-ui";
import {TextFieldProps} from "material-ui/TextField";
import {isFunction} from "lodash";
import {FormEventWithTargetValue, HTMLDivElementWithValue} from "../core/Interfaces";
import * as DropZone from "dropzone";

//ToDo: configure dropZone, connect it with form state and handle on server side
export interface ContentEditableFieldProps extends TextFieldProps {
    dropZoneUrl: string;
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
        const {dropZoneUrl, dropZoneOptions, dropZoneContainer} = nextProps;
        const {dropZoneContainer: oldDropZoneContainer} = this.props;
        if (dropZoneContainer && !this.dropZone) {
            this.dropZone = new DropZone(
                dropZoneContainer,
                {
                    url: dropZoneUrl,
                    ...dropZoneOptions,
                    previewsContainer: this.inputElement
                }
            );
        }

    }

    render() {
        let {dropZoneUrl, dropZoneOptions, dropZoneContainer, ...props} = this.props;
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