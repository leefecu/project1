import React, { PureComponent } from "react";
import { Platform } from "react-native";
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from "react-native-fcm";
import { connect } from "react-redux";

import CoreActions from "../Actions";
import * as CoreConstants from "../Constants";

class PushNotificationController extends PureComponent {
    constructor(props) {
        super(props);

        this._onClickNotification = this._onClickNotification.bind(this);
        this._changePageFromNotification = this._changePageFromNotification.bind(
            this
        );
        this._sendRemote = this._sendRemote.bind(this);
    }

    componentWillUnmount() {
        this.notificationListner.remove();
        this.refreshTokenListener.remove();
    }

    componentDidMount() {
        FCM.requestPermissions();

        FCM.getFCMToken().then(token => {
            
        });

        FCM.getInitialNotification().then(notif => {
            // for android/ios app killed state
            if (notif) {
                // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            }
        });

        this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
            let msg = {};
            if (Platform.OS === "ios") {
                if (notif.local_notification) {
                    return;
                }

                if (notif.opened_from_tray) {
                    this._onClickNotification(notif);
                    return;
                }

                //optional
                //iOS requires developers to call completionHandler to end notification process.
                //If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent,
                //finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        notif.finish(RemoteNotificationResult.NewData);
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        //other types available: WillPresentNotificationResult.None
                        notif.finish(WillPresentNotificationResult.All);
                        this._getIOSMessage(notif._notificationType, notif);
                        this.showLocalNotification(msg);
                        break;
                }
            }

            if (Platform.OS === "android") {
                if (notif.opened_from_tray) {
                    this._onClickNotification(notif);
                    return;
                }

                if (notif.fcm && notif.fcm.title) {
                    this._sendRemote(notif);
                }
            }
        });

        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
            //console.log("TOKEN (refreshUnsubscribe)", token);
        });
    }

    _sendRemote = notif => {
        FCM.presentLocalNotification({
            title: notif.fcm.title, // as FCM payload
            body: notif.fcm.body, // as FCM payload (required)
            type: notif.type,
            sound: "default", // as FCM payload
            priority: "high", // as FCM payload
            click_action: "ACTION", // as FCM payload
            auto_cancel: true, // Android only (default true)
            vibrate: 300, // Android only default: 300, no vibration if you pass 0
            wake_screen: true, // Android only, wake up screen when notification arrives
            lights: true, // Android only, LED blinking (default false)
            show_in_foreground: true, // notification when app is in foreground (local & remote)
            //"large_icon": "ic_notif",// Android only
            icon: "ic_notif",
            wake_screen: true,
            ongoing: true
        });
    };

    showLocalNotification(notif) {
        FCM.presentLocalNotification({
            title: notif.title,
            body: notif.body,
            type: notif.type,
            priority: "high",
            click_action: notif.clickUrl,
            show_in_foreground: true,
            local: true,
            icon: "ic_notif"
        });
    }

    _getIOSMessage(type, notif) {
        switch (notif._notificationType) {
            case NotificationType.Remote:
                break;
            case NotificationType.WillPresent:
                if (notif && notif.aps && notif.aps.alert) {
                    return {
                        title: notif.aps.alert.title && notif.aps.alert.title,
                        body: notif.aps.alert.body && notif.aps.alert.body
                    };
                }
                break;
        }
        return null;
    }

    _onClickNotification(notif) {
        if (notif.type) {
            this._changePageFromNotification(notif.type);
        }
    }

    _changePageFromNotification = type => {
        switch (type) {
            case CoreConstants.NOTI_SP_CAR:
                this._changeTab("listings", 0);
                break;
            case CoreConstants.NOTI_SP_COUPON:
                this._changeTab("coupons", 1);
                break;
            case CoreConstants.NOTI_EVT_SIGNUP:
                this._openShowModal("carmate.Signup");
                break;
        }
    };

    _changeTab = (page, tabIndex) => {
        this.props.changePage(page);
        this.props.navigator.switchToTab({
            tabIndex: tabIndex
        });
    };

    _openShowModal = modal => {
        this.props.navigator.showModal({
            screen: modal,
            animationType: "slide-up",
            backButtonHidden: true
        });
    };

    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePage: page => dispatch(CoreActions.changePage(page))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(PushNotificationController);
