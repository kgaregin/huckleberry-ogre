import * as React from "react";
import {MuiThemeProvider, withStyles, Grid, Paper, WithStyles} from "@material-ui/core";
import {theme} from "../Theme";
import {styles} from "../styles/components/GlobalLayout";

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
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container>
                    <Paper className={this.props.classes.mainPaper} square>
                        {this.props.children}
                    </Paper>
                </Grid>
            </MuiThemeProvider>);
    }
}
export const GlobalLayout = withStyles(styles)(GlobalLayoutComponent);