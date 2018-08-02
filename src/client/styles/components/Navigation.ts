import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';

/** Menu width. */
export const DRAWER_WIDTH = 240;

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        padding: '0 !important'
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        transform: 'scale(1)',
        transition: '.3s .3s',
        marginLeft: 12,
        marginRight: 20,
        color: theme.palette.secondary.contrastText
    },
    homeButton: {
        transition: '.3s'
    },
    homeButtonShift: {
        transform: 'translate3d(-70px,0,0)'
    },
    hide: {
        transform: 'scale(0)',
        transition: '.3s'
    },
    drawerPaper: {
        position: 'relative',
        height: 'auto',
        width: DRAWER_WIDTH,
        borderRight: '0px !important',

    },
    drawerDocked: {
        backgroundColor: theme.palette.background.paper
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        height: '64px',
        // ...theme.mixins.toolbar,
    },
    content: {
        overflow: 'auto',
        width: '100%',
        marginLeft: -DRAWER_WIDTH,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 112px)',
        marginTop: '64px',
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 112px)'
        },
    },
    contentShift: {
        marginLeft: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    listItemText: {
        display: 'inline-block',
        userSelect: 'none'
    },
    listItem: {
        padding: '8px 16px !important',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            cursor: 'pointer'
        }
    },
    list: {
        width: '100%',
        padding: '0'
    }
} as StyleRules);