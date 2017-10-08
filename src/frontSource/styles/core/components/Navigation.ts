import {StyleRulesCallback, Theme} from "material-ui/styles";
import {DRAWER_WIDTH} from "../../../core/consts";

export const styles: StyleRulesCallback = (theme: Theme) => ({
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
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: 'auto',
        width: DRAWER_WIDTH,
        borderRight: '0px !important'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        height: '64px'
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
        marginTop: 64,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 112px)',
                marginTop: 64,
            },
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
            backgroundColor: theme.palette.primary.A700,
            cursor: 'pointer'
        }
    }
});