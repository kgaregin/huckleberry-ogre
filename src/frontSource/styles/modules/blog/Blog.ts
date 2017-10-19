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
    buttonCreate: {
        position: 'absolute',
        right: '40px',
        bottom: '40px',
    },
    postDivider: {
        width: '70%',
        margin: '16px auto',
    },
    postPaper: {
        padding: '24px 32px',
        boxSizing: 'border-box',
        marginBottom: '24px',
        wordWrap: 'break-word',

        '&:last-of-type': {
            marginBottom: 'initial'
        }
    },
    postActions: {
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    postActionButtonIcon: {
        color: theme.palette.primary.contrastDefaultColor,

        '&:hover': {
            color: theme.palette.secondary.A700
        }
    },
    buttonClickableOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    }
});