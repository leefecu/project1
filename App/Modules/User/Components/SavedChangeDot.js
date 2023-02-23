// @flow
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import * as CoreSelectors from '../../Core/Selectors'
import * as ListingsSelectors from '../../Listings/Selectors'
import * as UserSelectors from '../../User/Selectors'

import ChangeDot from '../../Core/Components/ChangeDot'

import Styles from './Styles/SavedChangeDot'

class SavedChangeDot extends PureComponent {

    _renderChangeDot = () => {        
        const {
            type,
            savedCar,
            savedCoupon,
            loggedIn
        } = this.props

        if(loggedIn){

            switch(type){
                case 'cars' :
                    if(savedCar){
                        return <ChangeDot />
                    }
                break
                case 'coupons' :
                    if(savedCoupon){
                        return <ChangeDot />
                    }
                break
                case 'total' :
                    if(savedCoupon || savedCar){
                        return <ChangeDot />
                    }
                break
            }
   
        }
        return null
    }

    render () {
        return (
            <View style={Styles.changeDotContainer}>
                {this._renderChangeDot()}
            </View>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        savedCar: ListingsSelectors.getSavedCar(state),
        savedCoupon: ListingsSelectors.getSavedCoupon(state),
        savedTabStatus: CoreSelectors.getSavedTabStatus(state),
        loggedIn: UserSelectors.getLoggedIn(state),
    }
}

export default connect(mapStateToProps)(SavedChangeDot)
