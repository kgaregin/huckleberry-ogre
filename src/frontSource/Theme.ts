import {green, red, grey} from '@material-ui/core/colors';
import {createMuiTheme} from "@material-ui/core";
import {Theme} from "@material-ui/core";

export const theme: Theme = createMuiTheme({
    palette: {
        primary: grey, // Purple and green play nicely together.
        secondary: green,
        error: red,
        type: "dark"
    }
});