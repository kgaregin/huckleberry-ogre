import {green, red, purple} from 'material-ui/colors';
import createMuiTheme from "material-ui/styles/createMuiTheme";

export const theme = createMuiTheme({
    palette: {
        primary: purple, // Purple and green play nicely together.
        secondary: green,
        error: red,
    }
});