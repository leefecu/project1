import React from 'react'
import {
    ActivityIndicator,
    View
} from 'react-native'

import { Images, Colors, Layout } from '../../../Themes'

//Styles
import Styles from './Styles/LoadingView'

const LoadingView = () => {

    return (
        <View style={[Styles.container]}>
            <ActivityIndicator animating={true} style={Styles.loadingIcon} size='large' />
        </View>
    )

}

export default LoadingView
