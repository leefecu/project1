/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation'

import TabIcon from '../Components/TabIcon'

import FeaturedListings from '../../Listings/Containers/FeaturedListings'
import ListingDetail from '../../Listings/Containers/ListingDetail'
import Refine from '../../Listings/Components/Refine'
import SubRefine from '../../Listings/Components/SubRefine'

import Showroom from '../../Showroom/Containers/Showroom'
import ShowroomListingDetail from '../../Showroom/Containers/ShowroomListingDetail'

import FeaturedCoupons from '../../Coupons/Containers/FeaturedCoupons'
import CouponDetail from '../../Coupons/Containers/CouponDetail'
import ExclusiveCouponDetail from '../../Coupons/Containers/ExclusiveCouponDetail'

import Saved from '../../User/Containers/Saved'

import SellMyCar from '../../SellMyCar/Containers/SellMyCar'

import CarsIamSelling from '../../User/Containers/CarsIamSelling'
import MyInfo from '../../User/Containers/MyInfo'

import Login from '../../User/Containers/Login'
import Signup from '../../User/Containers/Signup'
import ForgotPassword from '../../User/Containers/ForgotPassword'
import Reviews from '../../Review/Containers/Reviews'

import WebContents from './WebContents'

import NavBar from '../Components/NavBar'
import SideMenu from '../Components/SideMenu'

import ListingImageGalleryModal from '../../Listings/Components/ImageGalleryModal'
import CouponImageGalleryModal from '../../Coupons/Components/ImageGalleryModal'
import CallModal from '../../Core/Components/CallModal'

//Modal
import UpdateModal from '../../Core/Components/UpdateModal'
import MaintenanceModal from '../../Core/Components/MaintenanceModal'
import SupportModal from '../../Core/Components/SupportModal'
import TimeoutModal from '../../Core/Components/TimeoutModal'

export function registerScreens(store, Provider) {

    Navigation.registerComponent('carmate.Listings', () => FeaturedListings, store, Provider)
    Navigation.registerComponent('carmate.ListingDetail', () => ListingDetail, store, Provider)

    Navigation.registerComponent('carmate.Showroom', () => Showroom, store, Provider)
    Navigation.registerComponent('carmate.ShowroomListingDetail', () => ShowroomListingDetail, store, Provider)

    Navigation.registerComponent('carmate.ListingImageGalleryModal', () => ListingImageGalleryModal, store, Provider)
    Navigation.registerComponent('carmate.CouponImageGalleryModal', () => CouponImageGalleryModal, store, Provider)
    Navigation.registerComponent('carmate.CallModal', () => CallModal, store, Provider)

    Navigation.registerComponent('carmate.Coupons', () => FeaturedCoupons, store, Provider)
    Navigation.registerComponent('carmate.CouponDetail', () => CouponDetail, store, Provider)
    Navigation.registerComponent('carmate.ExclusiveCouponDetail', () => ExclusiveCouponDetail, store, Provider)
    Navigation.registerComponent('carmate.Reviews', () => Reviews, store, Provider)

    Navigation.registerComponent('carmate.Saved', () => Saved, store, Provider)

    Navigation.registerComponent('carmate.SellMyCar', () => SellMyCar, store, Provider)

    Navigation.registerComponent('carmate.CarsIamSelling', () => CarsIamSelling, store, Provider)
    Navigation.registerComponent('carmate.MyInfo', () => MyInfo, store, Provider)

    Navigation.registerComponent('carmate.WebContents', () => WebContents, store, Provider)

    Navigation.registerComponent('carmate.Login', () => Login, store, Provider)
    Navigation.registerComponent('carmate.Signup', () => Signup, store, Provider)
    Navigation.registerComponent('carmate.ForgotPassword', () => ForgotPassword, store, Provider)

    Navigation.registerComponent('carmate.NavBar', () => NavBar, store, Provider)
    Navigation.registerComponent('carmate.SideMenu', () => SideMenu, store, Provider)
    Navigation.registerComponent('carmate.Refine', () => Refine, store, Provider)
    Navigation.registerComponent('carmate.SubRefine', () => SubRefine, store, Provider)

    Navigation.registerComponent('carmate.MaintenanceModal', () => MaintenanceModal, store, Provider)
    Navigation.registerComponent('carmate.UpdateModal', () => UpdateModal, store, Provider)
    Navigation.registerComponent('carmate.SupportModal', () => SupportModal, store, Provider)
    Navigation.registerComponent('carmate.TimeoutModal', () => TimeoutModal, store, Provider)
}
