import * as React from "react";
import {MuiThemeProvider, withStyles, Grid, Paper, WithStyles} from "@material-ui/core";
import {theme} from "../../Theme";
import {styles} from "../../styles/core/components/GlobalLayout";

class GlobalLayoutComponent extends React.Component<{children: JSX.Element} & WithStyles> {
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