// @flow
import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

const Layout = {
    flex: {
        flex: 1
    },
    flex1: {
        flex: 0.1
    },
    flex2: {
        flex: 0.2
    },
    flex3: {
        flex: 0.3
    },
    flex4: {
        flex: 0.4
    },
    flex5: {
        flex: 0.5
    },
    flex6: {
        flex: 0.6
    },
    flex7: {
        flex: 0.7
    },
    flex8: {
        flex: 0.8
    },
    flex9: {
        flex: 0.9
    },
    horizontalRow: {
        flexDirection: 'row'
    },
    textCenterAlign: {
        alignItems: 'center'
    },
    textLeftAlign: {
        alignItems: 'flex-start'
    },
    textRightAlign: {
        alignItems: 'flex-end'
    },
    textBottomAlign: {
        justifyContent: 'flex-end'
    },
    textTopAlign: {
        justifyContent: 'flex-start'
    },
    textMiddleAlign: {
        justifyContent: 'center'
    },
    itemStretch: {
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    itemCentral: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    flexReverse: {
       flexDirection: 'row-reverse'
    }
}

export default Layout
