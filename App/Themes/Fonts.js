// @flow
import {Dimensions, Platform, NativeModules} from 'react-native'
const { width, height } = Dimensions.get('window')

const type = {
  base: 'HelveticaNeue',
  bold: 'HelveticaNeue-Bold',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: Platform.OS === 'ios' ? 24 : 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 15,
  smallMedium: 13,
  small: 12,
  smaller: 10,
  tiny: 8.5
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  smallBold: {
    fontSize: size.small,
    fontWeight: 'bold'
  }
}

export default {
  type,
  size,
  style
}

