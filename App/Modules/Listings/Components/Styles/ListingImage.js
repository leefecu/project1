// @flow

import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Layout, Fonts } from '../../../../Themes/'

const { width, height } = Dimensions.get('window')
const cardImg = (width- (Metrics.basePadding*2))*0.618
const imageW = width <= 320 ? 100 : width <= 375 ? 130 : 160
const imageH = width <= 320 ? 100 : width <= 375 ? 110 : 120
const placeholderSize = width <= 320 ? imageW * 0.7 : imageW * 0.6
const placeholderLSize = (width-20) * 0.4
const labelW = 46
const labelH = 14
const cardLabelW = 52
const cardLabelH = 16
const specialLabelSize = 125

export const ListListingStyles = StyleSheet.create({
    imageContainer: {
        width: imageW,
        height: imageH,
        backgroundColor: Colors.imageGreyBg,
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageSubContainer: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
    },
    featureLabel: {
        ...Layout.itemCentral,
        flex: 1,
        position: 'absolute',
        top: 4,
        left: 0,
        zIndex: 30,
        flexDirection: 'column'
    },
    featureLabelBackgroundContainer: {
        width: labelW,
        height: labelH,
        borderTopRightRadius: labelH/2,
        borderBottomRightRadius: labelH/2
    },
    saleLabelBg: {
        backgroundColor: Colors.darkRed
    },
    valueLabelBg: {
        backgroundColor: Colors.blue
    },
    featuredLabelBg: {
        backgroundColor: Colors.yellow
    },
    comingLabelBg: {
        backgroundColor: Colors.blueGrey
    },
    featureLabelTextContainer:{
        width: labelW,
        height: labelH,
        position: 'absolute',
        top: 0,
        left: -1.5,
        zIndex: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    featureLabelText: {
        color: Colors.snow,
        fontWeight: '600',
        backgroundColor: 'transparent',
    },
    baseSizeLabel: {
        fontSize: Fonts.size.smaller,
        fontWeight: '600',
    },
    saleLabel: {
        fontSize: Fonts.size.smaller,
        fontWeight: '700',
        letterSpacing: 0.3
    },
    featuredLabel: {
        fontSize: Fonts.size.smaller,
        letterSpacing:-0.5
    },
    comingLabel: {
        fontSize: Fonts.size.smaller,
        letterSpacing:-0.1
    },
    imagePlaceholder: {
        width: imageW,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePlaceholderIcon: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noImagePlaceholderImg: {
        width: placeholderSize,
        height: placeholderSize
    },
    imagePlaceholderImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: imageW,
        height: imageH,
    }
})

export const CardListingStyles = StyleSheet.create({
    imageContainer: {
        ...Layout.itemCentral,
        height: cardImg,
        backgroundColor: Colors.imageGreyBg,
        position: 'relative',
        overflow: 'hidden',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexDirection: 'row',
    },
    featureLabel: {
        ...Layout.itemCentral,
        flex: 1,
        position: 'absolute',
        top: 8,
        left: 0,
        zIndex: 30,
        flexDirection: 'column'
    },
    featureLabelBackgroundImage: {
        width: cardLabelW,
        height: cardLabelH,
        padding: 0,
        margin: 0,
        zIndex: 10
    },
    saleLabelBg: {
        backgroundColor: Colors.darkRed
    },
    valueLabelBg: {
        backgroundColor: Colors.blue
    },
    featuredLabelBg: {
        backgroundColor: Colors.yellow
    },
    comingLabelBg: {
        backgroundColor: Colors.blueGrey
    },
    featureLabelBackgroundContainer: {
        width: cardLabelW,
        height: cardLabelH,
        borderTopRightRadius: cardLabelH/2,
        borderBottomRightRadius: cardLabelH/2
    },
    featureLabelTextContainer:{
        width: cardLabelW,
        height: cardLabelH,
        position: 'absolute',
        top: 0,
        left: -1.5,
        zIndex: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    featureLabelText: {
        color: Colors.snow,
        fontWeight: '600',
        backgroundColor: 'transparent',
    },
    baseSizeLabel: {
        fontSize: Fonts.size.smaller + 1,
        fontWeight: '600',
    },
    featuredLabel: {
        fontSize: Fonts.size.smaller + 1,
        letterSpacing:-0.5
    },
    comingLabel: {
        fontSize: Fonts.size.smaller + 1,
        letterSpacing:-0.1
    },
    
    featureSpecialLabelBackgroundImage: {
        width: specialLabelSize,
        height: specialLabelSize,
        position: 'absolute',
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 4,
    },
    featureSpecialLabel: {
        width: specialLabelSize,
        height: specialLabelSize,
        padding: 0,
        position: 'absolute',
        top: -17,
        left: -17,
        transform: [{ rotate: '-45deg'}],
        zIndex: 30,
        borderTopLeftRadius: 4,
        overflow: 'hidden'
    },
    featureLabelSpecialTextContainer: {
        width: specialLabelSize,
        height: specialLabelSize/2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 17,
        paddingRight: 3.5
    },
    featureLabelSpecialSaleText:{
        fontSize: Fonts.size.small,
        fontWeight: '600'
    },
    featureLabelSpecialPriceText:{
        fontSize: Fonts.size.regular,
        fontWeight: 'bold',
        paddingBottom: 4
    },
    featureLabelSpecialText: {
        color: Colors.snow,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    imageSubContainer: {
        flex: 1,
        height: cardImg,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0
    },
    listingImage: {
        
    },
    imagePlaceholder: {
        width: width - (Metrics.basePadding * 2),
        height: cardImg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        overflow: 'hidden',
    },
    imagePlaceholderImg: {
        width: width - (Metrics.basePadding * 2),
        height: cardImg,
        //borderRadius: 4
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    noImagePlaceholder: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noImagePlaceholderIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:  5
    },
    noImagePlaceholderImg: {
        width: placeholderLSize,
        height: placeholderLSize
    },
    noImageText: {
        color: Colors.inactiveGreyText,
        fontSize: Fonts.size.regular,
        fontWeight: '600'
    }
})
