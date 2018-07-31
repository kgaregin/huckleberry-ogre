import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
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
        minHeight: '75vh',
        whiteSpace: 'pre-wrap',

        '& img': {
            maxWidth: '100%'
        },
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
    },
    dropZone: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        backgroundColor: 'rgba(0,0,0,.5)',
        outline: '2px dashed black',
        outlineOffset: '-80px',
        transition: '.3s',

        '&.active': {
            visibility: 'visible',
            pointerEvents: 'auto'
        }
    }
} as StyleRules);
