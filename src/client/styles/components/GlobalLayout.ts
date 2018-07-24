import {StyleRulesCallback, Theme} from '@material-ui/core'

export const styles: StyleRulesCallback = (theme: Theme) => ({
    '@global': {
        a: {
            color: "inherit",
            textDecoration: "none"
        },
        '.display-none-md-up': {
            [theme.breakpoints.up('md')]: {
                display: 'none'
            }
        }
    },
    mainPaper: {
        width: '100%',
    },
});