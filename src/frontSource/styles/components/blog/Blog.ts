import {StyleRulesCallback, Theme} from "material-ui/styles";
import {DRAWER_WIDTH} from "../../../core/consts";

export const styles: StyleRulesCallback = (theme: Theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonCreate:{
        position: 'absolute',
        right: '40px',
        bottom: '40px',
    }
});