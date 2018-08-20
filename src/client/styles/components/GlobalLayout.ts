import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    '@global': {
        a: {
            color: 'inherit',
            textDecoration: 'none'
        },
        '.display-none-md-up': {
            [theme.breakpoints.up('md')]: {
                display: 'none'
            }
        },
        '.text-center': {
            textAlign: 'center'
        },
        '.text-left': {
            textAlign: 'left'
        },
        '.text-right': {
            textAlign: 'right'
        },
        '.text-ellipsis': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        '.margin-0': {
            margin: 0
        },
        '.margin-1': {
            margin: theme.spacing.unit
        },
        '.margin-2': {
            margin: theme.spacing.unit * 2
        },
        '.margin-top-0': {
            marginTop: 0
        },
        '.margin-right-0': {
            marginRight: 0
        },
        '.margin-bottom-0': {
            marginBottom: 0
        },
        '.margin-left-0': {
            marginLeft: 0
        },
        '.margin-top-1': {
            marginTop: theme.spacing.unit
        },
        '.margin-right-1': {
            marginRight: theme.spacing.unit
        },
        '.margin-bottom-1': {
            marginBottom: theme.spacing.unit
        },
        '.margin-left-1': {
            marginLeft: theme.spacing.unit
        },
        '.margin-top-2': {
            marginTop: theme.spacing.unit * 2
        },
        '.margin-right-2': {
            marginRight: theme.spacing.unit * 2
        },
        '.margin-bottom-2': {
            marginBottom: theme.spacing.unit * 2
        },
        '.margin-left-2': {
            marginLeft: theme.spacing.unit * 2
        },
        '.padding-0': {
            padding: 0
        },
        '.padding-1': {
            padding: theme.spacing.unit
        },
        '.padding-2': {
            padding: theme.spacing.unit * 2
        },
        '.padding-top-0': {
            paddingTop: 0
        },
        '.padding-right-0': {
            paddingRight: 0
        },
        '.padding-bottom-0': {
            paddingBottom: 0
        },
        '.padding-left-0': {
            paddingLeft: 0
        },
        '.padding-top-1': {
            paddingTop: theme.spacing.unit
        },
        '.padding-right-1': {
            paddingRight: theme.spacing.unit
        },
        '.padding-bottom-1': {
            paddingBottom: theme.spacing.unit
        },
        '.padding-left-1': {
            paddingLeft: theme.spacing.unit
        },
        '.padding-top-2': {
            paddingTop: theme.spacing.unit * 2
        },
        '.padding-right-2': {
            paddingRight: theme.spacing.unit * 2
        },
        '.padding-bottom-2': {
            paddingBottom: theme.spacing.unit * 2
        },
        '.padding-left-2': {
            paddingLeft: theme.spacing.unit * 2
        },
    },
    mainPaper: {
        width: '100%',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
} as StyleRules);