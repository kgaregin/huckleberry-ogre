import * as React from 'react';
import {ErrorInfo} from 'react';
import {Ghost} from "./Ghost";

export interface IErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends React.Component<{ children: JSX.Element }, IErrorBoundaryState> {
    state: IErrorBoundaryState = {hasError: false};

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Display fallback UI
        this.setState({
                hasError: true,
                error: error,
                errorInfo: errorInfo
            }
        );
        // You can also log the error to an error reporting service
        console.log(error, errorInfo)
    }

    render() {
        const {children} = this.props;
        const {hasError, error, errorInfo} = this.state;
        if (hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <Ghost/>
                    <hr/>
                    <h3>{error && error.toString()}</h3>
                    <br/>
                    <h3>{errorInfo && errorInfo.componentStack}</h3>
                </div>
            );
        }
        return children;
    }
}