import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core'
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    '@global': {
        a: {
            color: "inherit",
            textDecoration: "none"
        },
        '.text-center': {
            textAlign: 'center'
        },
        '.display-none-md-up': {
            [theme.breakpoints.up('md')]: {
                display: 'none'
            }
        }
    },
    mainPaper: {
        width: '100%',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    dropZone: {
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
    }
} as StyleRules);