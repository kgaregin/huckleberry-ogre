export interface IWithClasses {
    classes: {
        [key: string]: string
    }
}

export interface IWithTargetValue<T> {
    target: {
        value: T
    }
}