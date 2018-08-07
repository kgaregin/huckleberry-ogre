import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core'
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
        width: theme.spacing.unit * 50,
        minHeight: '50vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        zIndex: 2000
    }
} as StyleRules);