import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core'
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    dropZoneBackground: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.4)',
        outline: '2px dashed black',
        outlineOffset: '-80px',

        '&.active': {
            zIndex: 2000,
        }
    },
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    }
} as StyleRules);