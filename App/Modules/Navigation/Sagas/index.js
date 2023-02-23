import { Platform } from 'react-native'

export function * pushLoginPage (navigator) {

    const nav = navigator.navigator
    try {

        nav.toggleTabs({
            to: 'hidden',
            animated: true
        })

        nav.push({
            screen: 'carmate.Login',
            title: 'Log In',
            animated: true,
            backButtonTitle: '',
            navigatorStyle: {
                drawUnderTabBar: Platform.OS === 'ios',
            }
        })

    } catch (error) {
        console.log('error', error)
    }
    
}

