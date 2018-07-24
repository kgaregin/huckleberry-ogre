import {StyleRulesCallback, Theme} from "@material-ui/core";

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
        width: '90%',
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
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row'
        }
    },
    postActionButtonIcon: {
        color: theme.palette.primary.contrastText,

        '&:hover': {
            color: theme.palette.secondary.dark
        }
    }
});