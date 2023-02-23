// @flow

import React, { PureComponent } from 'react'
import {
    ActivityIndicator,
    Image,
    Platform,
    Text,
    View,
    TouchableOpacity
} from 'react-native'

import { Images, Metrics } from '../../../Themes'

// Let's keep this. May be used in the future
//import Image from 'react-native-image-progress'

import * as Constants from '../Constants'
import * as UserSelectors from '../../User/Selectors'
import { getLabelNameByPlanScore } from '../Helpers'
import { numberWithCommas } from '../../Core/Helpers/number'

//Styles
import { CardListingStyles, ListListingStyles } from './Styles/ListingImage'

class ListingImage extends PureComponent {

    constructor (props) {
        super(props)

        this.state = {
            imageLoaded: false
        }

        this._onLoad = this._onLoad.bind(this)
    }

    componentDidMount () {
        if (this.state.imageLoaded === false) {
            this.forceUpdate()
        }
    }

    _onLoad () {
        this.setState({imageLoaded: true})
    }

    renderCardFeatureLabel () {
        const {
            originalPrice,
            price,
            planScore,
            upcoming
        } = this.props
        let label = getLabelNameByPlanScore(planScore)

        if (upcoming){
            label = 'Upcoming'
        }
        const savePrice = originalPrice - price
        let featureLabel = CardListingStyles.featureLabel
        let featureLabelBackgroundImage = CardListingStyles.featureLabelBackgroundImage
        let featureLabelBackgroundContainer
        let featureLabelBgColor
        let imageSource = Images.labelSpecial
        let labelSize = CardListingStyles.baseSizeLabel

        switch (label) {
            case Constants.LABLE_SPECIAL_SALE :
                featureLabel = CardListingStyles.featureSpecialLabel
                featureLabelBackgroundImage = CardListingStyles.featureSpecialLabelBackgroundImage
                break
            case Constants.LABLE_EXCLUSIVE :
                label = "VALUE"
                featureLabelBackgroundContainer = CardListingStyles.featureLabelBackgroundContainer
                featureLabelBgColor = CardListingStyles.valueLabelBg
                break
            case Constants.LABLE_AWESOME :
                label = "VALUE"
                featureLabelBackgroundContainer = CardListingStyles.featureLabelBackgroundContainer
                featureLabelBgColor = CardListingStyles.valueLabelBg
                break
            case Constants.LABLE_FEATURED :
                label = "Featured"
                labelSize = CardListingStyles.featuredLabel
                featureLabelBackgroundContainer = CardListingStyles.featureLabelBackgroundContainer
                featureLabelBgColor = CardListingStyles.featuredLabelBg
                break
            case "Upcoming" :
                label = "Coming"
                labelSize = CardListingStyles.comingLabel
                featureLabelBackgroundContainer = CardListingStyles.featureLabelBackgroundContainer
                featureLabelBgColor = CardListingStyles.comingLabelBg
                break
        }

        return (
            <View style={featureLabel}>
                { label === Constants.LABLE_SPECIAL_SALE ?
                    <Image source={imageSource} style={featureLabelBackgroundImage} resizeMode='stretch' />
                :
                    <View style={[featureLabelBackgroundContainer, featureLabelBgColor]}></View>
                }
                { label === Constants.LABLE_SPECIAL_SALE ?
                    <View style={[CardListingStyles.featureLabelSpecialTextContainer ]}>
                        <Text style={[CardListingStyles.featureLabelSpecialText, CardListingStyles.featureLabelSpecialSaleText]}>SAVE</Text>
                        <Text style={[CardListingStyles.featureLabelSpecialText, CardListingStyles.featureLabelSpecialPriceText]}>${numberWithCommas(savePrice)}</Text>
                    </View>
                :
                    <View style={CardListingStyles.featureLabelTextContainer}>
                        <Text style={[CardListingStyles.featureLabelText, labelSize]}>{ label }</Text>
                    </View>
                }
            </View>
        )

    }

    renderCardCarImage () {
        return (
        <View style={CardListingStyles.imagePlaceholder}>
            <Image source={Images.noImagesL} style={CardListingStyles.noImagePlaceholderImg} resizeMode='contain' />
            <Image
                source={{uri: this.props.images[0]}}
                style={CardListingStyles.imagePlaceholderImg}
                resizeMode='cover'
                onLoad={this._onLoad}
            />
        </View>
        )
    }

    renderCardNoImage () {
        return (
        <View style={CardListingStyles.noImagePlaceholder}>
            <View style={CardListingStyles.noImagePlaceholderIcon}>
               <Image source={Images.noImagesL} style={CardListingStyles.noImagePlaceholderImg} resizeMode='contain' />
            </View>
        </View>
        )

    }

    renderListFeatureLabel () {
        const {
            originalPrice,
            plan,
            price
        } = this.props

        const savePrice = originalPrice - price
        let featureLabelText = plan
        let labelSize = ListListingStyles.baseSizeLabel
        let featureLabelBgColor = ListListingStyles.valueLabelBg

        if(plan){
            switch (plan) {
                case Constants.LABLE_SPECIAL_SALE:
                    featureLabelText = "SALE"
                    labelSize = ListListingStyles.saleLabel
                    featureLabelBgColor = ListListingStyles.saleLabelBg
                    break
                case Constants.LABLE_EXCLUSIVE:
                    featureLabelText = "VALUE"
                    break
                case Constants.LABLE_AWESOME:
                    featureLabelText = "VALUE"
                    break
                case Constants.LABLE_FEATURED:
                    featureLabelText = "Featured"
                    labelSize = ListListingStyles.featuredLabel
                    featureLabelBgColor = ListListingStyles.featuredLabelBg
                    break
                case Constants.LABEL_UPCOMING:
                    featureLabelText = "Coming"
                    labelSize = ListListingStyles.comingLabel
                    featureLabelBgColor = ListListingStyles.comingLabelBg
                    break
            }

            if(plan !== "basic"){
                return (
                    <View style={[ ListListingStyles.featureLabel ]}>
                        <View style={[ListListingStyles.featureLabelBackgroundContainer, featureLabelBgColor]}>
                        </View>
                        <View style={ListListingStyles.featureLabelTextContainer}>
                            <Text style={[ListListingStyles.featureLabelText, labelSize]}>{ featureLabelText }</Text>
                        </View>
                    </View>
                )
            }

            return null

        }

        return null

    }

    renderListNoImage = () => <Image source={Images.noImages} style={[ListListingStyles.noImagePlaceholderImg]} resizeMode='contain' />

    renderListCarImage () {
        let props = {}
        if (Platform.OS === 'ios') {
            props.defaultSource = Images.noImages
        }

        return (
            <View style={ListListingStyles.imagePlaceholder}>
                <Image source={Images.noImages} style={[ListListingStyles.noImagePlaceholderImg]} resizeMode='contain' />

                <Image
                    source={{uri: this.props.listViewMainImage}}
                    style={ListListingStyles.imagePlaceholderImg}
                    resizeMode='cover'
                    onLoad={this._onLoad}
                />
            </View>
        )
    }

    render () {
        const {
            images,
            listViewMainImage
        } = this.props

        return this.props.type === Constants.LIST_TYPE_CARD ? (
            <View style={CardListingStyles.imageContainer}>
                {this.renderCardFeatureLabel()}
                <View style={CardListingStyles.listingImage}>
                    { images.length > 0 ? this.renderCardCarImage() : this.renderCardNoImage() }
                </View>
            </View>
        ) : (
            <View style={ListListingStyles.imageContainer}>
                <View style={ListListingStyles.imageSubContainer}>
                    <View>
                        {this.renderListFeatureLabel()}

                        <View style={ListListingStyles.imagePlaceholder}>
                            <View style={ListListingStyles.imagePlaceholderIcon}>
                                { listViewMainImage && isNaN(listViewMainImage) ? this.renderListCarImage() : this.renderListNoImage()}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

ListingImage.defaultProps = {
    listViewMainImage: false,
    image: [],
    originalPrice: 0,
    price: 0,
    planScore: 0,
    type: 'card',
    upcoming: false,
    plan: 'basic'
}

export default ListingImage
