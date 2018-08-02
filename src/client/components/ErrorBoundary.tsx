import * as React from 'react';
import {ErrorInfo} from 'react';
import {Ghost} from './Ghost';
import {Paper, Typography, Divider} from '@material-ui/core';

/**
 * @prop {boolean} hasError True in case error occurred.
 * @prop {Error} error Error object.
 * @prop {ErrorInfo} errorInfo Additional info.
 */
interface IState {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

/**
 * @prop {JSX.Element} children React children not provided by default.
 */
interface IProps {
    children: JSX.Element;
}

/**
 * This component will be rendered in case of render error in application.
 */
export class ErrorBoundary extends React.Component<IProps, IState> {
    state: IState = {hasError: false};

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
                <Paper style={{padding: '16px', margin: '16px', textAlign: 'center'}}>
                    <Typography variant="title" style={{marginBottom: '16px'}}>Something went wrong.</Typography>
                    <Ghost/>
                    <Typography variant="subheading" style={{textAlign: 'left'}}>{error && error.toString()}</Typography>
                    <Divider style={{margin: '8px 0'}}/>
                    <Typography variant="subheading" style={{textAlign: 'left'}}>{errorInfo && errorInfo.componentStack}</Typography>
                </Paper>
            );
        }
        return children;
    }
}