import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core'

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
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