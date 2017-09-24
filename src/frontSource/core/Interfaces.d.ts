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
export interface IWithTargetValue<T> {
    target: {
        value: T
    }
}

export type FormEventWithTargetValue<T> = FormEvent<HTMLDivElement> & IWithTargetValue<T>;