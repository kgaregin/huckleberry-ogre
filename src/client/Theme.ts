import {green, red, lightBlue} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core';
import {Theme} from '@material-ui/core';

export const theme: Theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: green,
        error: red,
        type: "light"
    }
});