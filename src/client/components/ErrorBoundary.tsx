import React from 'react';
import {ErrorInfo} from 'react';
import {Ghost} from '../assets/Ghost';
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
        this.setState({
                hasError: true,
                error: error,
                errorInfo: errorInfo
            }
        );
        console.log(error, errorInfo)
    }

    render() {
        const {children} = this.props;
        const {hasError, error, errorInfo} = this.state;
        if (hasError) {

            return (
                <Paper className="margin-2 padding-2 text-center">
                    <Typography variant="title" className="margin-bottom-2">Something went wrong.</Typography>
                    <Ghost/>
                    <Typography variant="subheading" className="text-left">{error && error.toString()}</Typography>
                    <Divider className="margin-top-1 margin-bottom-1 margin-left-0 margin-right-0"/>
                    <Typography variant="subheading" className="text-left">{errorInfo && errorInfo.componentStack}</Typography>
                </Paper>
            );
        }
        return children;
    }
}