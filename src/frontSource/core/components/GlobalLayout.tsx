import * as React from "react";
import {MuiThemeProvider, withStyles} from "material-ui/styles";
import {Grid, Paper, WithStyles} from "material-ui";
import {theme} from "../../Theme";
import {styles} from "../../styles/core/components/GlobalLayout";

class GlobalLayoutComponent extends React.Component<{children: JSX.Element} & WithStyles> {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Grid className={this.props.classes.rootGrid} item xs={12} xl={10}>
                    <Paper>
                        {this.props.children}
                    </Paper>
                </Grid>
            </MuiThemeProvider>);
    }
}
export const GlobalLayout = withStyles(styles)(GlobalLayoutComponent);