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
    actionPanel: {
        width: 'calc(100% - 32px)',
        textAlign: 'left',
        backgroundColor: theme.palette.grey[50],
        padding: '4px 8px',
        boxShadow: 'black 0px 0px 5px -5px',
        borderRadius: '4px',
        border: `1px solid ${theme.palette.grey[400]}`,
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
