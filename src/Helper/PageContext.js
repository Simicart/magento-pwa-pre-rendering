import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import Identify from './Identify';
// A theme with custom primary and secondary color.
// It's optional.

const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
    primary: {
        contrastText: Identify.getColorConfig().button_text_color,
        main: Identify.getColorConfig().button_background
    }
  },
  direction: Identify.isRtl() ? 'rtl' : 'ltr',
  typography: {
    fontFamily: "Montserrat, sans-serif",
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
        root: {
            fontSize: '14px',
            backgroundColor: Identify.getColorConfig().button_background,
            color:Identify.getColorConfig().button_text_color,
            textTransform : 'unset'
        },
        label : {
            color: Identify.getColorConfig().button_text_color
        }
    },
    MuiInput: {
        root: {
            fontSize: 12
        },
        underline: {
            '&:after': {
                borderBottomColor: Identify.getColorConfig().button_background,
            }
        },
    },
    MuiFormLabel: {
        root: {
            fontSize: 12,
            
        },
        '&$focused': {
            color: Identify.getColorConfig().button_background,
        }
    }
}
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

let pageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}