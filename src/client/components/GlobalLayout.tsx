import * as React from 'react';
import {MuiThemeProvider, withStyles, Grid, Paper, WithStyles} from '@material-ui/core';
import {theme} from '../Theme';
import {styles} from '../styles/components/GlobalLayout';
import {preventDefaultDragNDropEvents} from '../modules/dropZone/Utils';
import {DropZone} from '../modules/dropZone/DropZone';

/**
 * @prop {JSX.Element} children React children not provided by default.
 */
interface IProps {
    children: JSX.Element;
}

/**
 * First render layer component.
 */
class GlobalLayoutComponent extends React.Component<IProps & WithStyles> {

    componentWillMount() {
        preventDefaultDragNDropEvents();
    }

    render() {
        const {classes, children} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <DropZone/>
                    <Grid container onDragEnter={() => {{/*handleDragEnter*/}}}>
                        <Paper className={classes.mainPaper} square>
                            {children}
                        </Paper>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export const GlobalLayout = withStyles(styles)(GlobalLayoutComponent);