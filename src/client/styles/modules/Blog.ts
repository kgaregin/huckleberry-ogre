import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    form: {
        padding: `0 ${theme.spacing.unit}`
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonCreate: {
        position: 'absolute',
        right: '40px',
        bottom: '40px',
    },
    actionPanel: {
        width: '100%',
        textAlign: 'left',
        marginTop: '16px',

        '&:hover hr': {
            borderStyle: 'solid'
        }
    },
    actionPanelButton: {
        '&:hover':{
            filter: 'drop-shadow(3px 3px 2px rgb(1, 1, 1, 0.3))',
            fontWeight: 600,
            backgroundColor: 'initial',
            textDecoration: 'initial',
        }
    },
    actionPanelIcon: {
        marginLeft: '5px'
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
    progress: {
        width: '100%',
        textAlign: 'center',
        transform: 'scale3d(1,0,1)',
        transition: '.3s',

        '&.active': {
            transform: 'scale3d(1,1,1)',
            marginBottom: '20px',
        }
    }
} as StyleRules);
