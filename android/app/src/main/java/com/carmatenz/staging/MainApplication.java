package com.carmatenz.staging;

import android.content.Intent;
import android.support.annotation.NonNull;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.yamill.orientation.OrientationPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.learnium.RNDeviceInfo.R;
import com.evollu.react.fcm.FIRMessagingPackage;

import java.util.Arrays;
import java.util.List;

import co.apptailor.googlesignin.RNGoogleSigninPackage;

public class MainApplication extends NavigationApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  @NonNull
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
      new OrientationPackage(),
      new RNFirebasePackage(),
      new RNFirebaseAnalyticsPackage(),
      new RNDeviceInfo(),
      new ReactNativeConfigPackage(),
      new RNGoogleSigninPackage(),
      new FBSDKPackage(mCallbackManager),
      new FIRMessagingPackage()
    );
  }

  @Override
  public void onCreate() {
    super.onCreate();

    AppEventsLogger.activateApp(this);

    setActivityCallbacks(new ActivityCallbacks() {
        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            mCallbackManager.onActivityResult(requestCode, resultCode, data);
        }
    });
    
    SoLoader.init(this, /* native exopackage */ false);
  }

}
