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
    }
} as StyleRules);