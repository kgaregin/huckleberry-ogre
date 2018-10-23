import {StyleRulesCallback, Theme, createStyles} from '@material-ui/core';
import {StyleRules} from '@material-ui/core/styles';

export const styles: StyleRulesCallback = (theme: Theme) => createStyles({
    '@global': {
        a: {
            color: 'inherit',
            textDecoration: 'none'
        },
        '.overflowHidden': {
          overflow: 'hidden !important'
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
            margin: `0 !important`
        },
        '.margin-1': {
            margin: `${theme.spacing.unit}px !important`
        },
        '.margin-2': {
            margin: `${theme.spacing.unit * 2}px !important`
        },
        '.margin-top-0': {
            marginTop: `0 !important`
        },
        '.margin-right-0': {
            marginRight: `0 !important`
        },
        '.margin-bottom-0': {
            marginBottom: `0 !important`
        },
        '.margin-left-0': {
            marginLeft: `0 !important`
        },
        '.margin-top-1': {
            marginTop: `${theme.spacing.unit}px !important`
        },
        '.margin-right-1': {
            marginRight: `${theme.spacing.unit}px !important`
        },
        '.margin-bottom-1': {
            marginBottom: `${theme.spacing.unit}px !important`
        },
        '.margin-left-1': {
            marginLeft: `${theme.spacing.unit}px !important`
        },
        '.margin-top-2': {
            marginTop: `${theme.spacing.unit * 2}px !important`
        },
        '.margin-right-2': {
            marginRight: `${theme.spacing.unit * 2}px !important`
        },
        '.margin-bottom-2': {
            marginBottom: `${theme.spacing.unit * 2}px !important`
        },
        '.margin-left-2': {
            marginLeft: `${theme.spacing.unit * 2}px !important`
        },
        '.padding-0': {
            padding: `0 !important`
        },
        '.padding-1': {
            padding: `${theme.spacing.unit}px !important`
        },
        '.padding-2': {
            padding: `${theme.spacing.unit * 2}px !important`
        },
        '.padding-top-0': {
            paddingTop: `0 !important`
        },
        '.padding-right-0': {
            paddingRight: `0 !important`
        },
        '.padding-bottom-0': {
            paddingBottom: `0 !important`
        },
        '.padding-left-0': {
            paddingLeft: `0 !important`
        },
        '.padding-top-1': {
            paddingTop: `${theme.spacing.unit}px !important`
        },
        '.padding-right-1': {
            paddingRight: `${theme.spacing.unit}px !important`
        },
        '.padding-bottom-1': {
            paddingBottom: `${theme.spacing.unit}px !important`
        },
        '.padding-left-1': {
            paddingLeft: `${theme.spacing.unit}px !important`
        },
        '.padding-top-2': {
            paddingTop: `${theme.spacing.unit * 2}px !important`
        },
        '.padding-right-2': {
            paddingRight: `${theme.spacing.unit * 2}px !important`
        },
        '.padding-bottom-2': {
            paddingBottom: `${theme.spacing.unit * 2}px !important`
        },
        '.padding-left-2': {
            paddingLeft: `${theme.spacing.unit * 2}px !important`
        },
        '.padding-top-3': {
            paddingTop: `${theme.spacing.unit * 3}px !important`
        },
        '.padding-right-3': {
            paddingRight: `${theme.spacing.unit * 3}px !important`
        },
        '.padding-bottom-3': {
            paddingBottom: `${theme.spacing.unit * 3}px !important`
        },
        '.padding-left-3': {
            paddingLeft: `${theme.spacing.unit * 3}px !important`
        },
    },
    mainPaper: {
        width: '100%',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
} as StyleRules);