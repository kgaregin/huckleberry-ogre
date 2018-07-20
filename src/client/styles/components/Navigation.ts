import {StyleRulesCallback, Theme} from "@material-ui/core";
import {DRAWER_WIDTH} from "../../core/consts";
import createStyles from '@material-ui/core/es/styles/createStyles';

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
        marginLeft: 12,
        marginRight: 20,
        color: theme.palette.secondary.contrastText
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: 'auto',
        width: DRAWER_WIDTH,
        borderRight: '0px !important',

    },
    drawerDocked: {

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
        padding: '0 16px !important'
    },
    list: {
        width: '100%',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            cursor: 'pointer'
        }
    }
});