import * as React from "react";
import {MuiThemeProvider, createMuiTheme, withStyles} from 'material-ui/styles';
import {Paper, Grid} from 'material-ui';
import {green, red, purple} from 'material-ui/colors';


const theme = createMuiTheme({
    palette: {
        primary: purple, // Purple and green play nicely together.
        secondary: {
            ...green,
            A400: '#00e677',
        },
        error: red,
    },
});

class GlobalLayout extends React.Component<{}, {}> {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Grid item xs={12}>
                    <Paper>
                        {this.props.children}
                    </Paper>
                </Grid>
            </MuiThemeProvider>);
    }
}

export {GlobalLayout};