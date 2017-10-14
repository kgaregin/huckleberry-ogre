import {FormEvent} from "react";

/**
 * For styled components (@withStyles).
 */
export interface IWithClasses {
    classes: {
        [key: string]: string
    }
}

/**
 * For events that's having value on their target.
 */
export interface FormEventWithTargetValue<E, T> extends FormEvent<E>{
    target: EventTarget & E & {
        value: T
    }
}

/**
 * Workaround for ContentEditableField with div that act like input (with contentEditable attribute).
 */
export interface HTMLDivElementWithValue extends HTMLDivElement{
    value: string;
}