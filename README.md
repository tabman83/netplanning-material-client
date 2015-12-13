# netplanning-material-client
NetPlanning Teacher is the unofficial Telelangue app and it is available for PC, MAC, iOS, Android, Windows Phone and Amazon FireOS / Blackberry.

## Installation

- Install [GIT](https://git-scm.com/downloads) (SDK tools only is fine)
- Run (in an elevated command line): `npm install --global yo gulp bower cordova nwjs`
- Run (Windows only): `npm install --global enigmavirtualbox`
- Optionally complete the Amazon/FireOS prerequisites steps
- Then run: `npm install`

## Commands

- Run `gulp serve` to preview and watch for changes
- Run `gulp serve:test` to run the tests in the browser
- Run `gulp` to build the webapp for production
- Run `gulp serve:dist` to preview the production build
- Run `gulp nwjs` to build the standalone app for production
- Run `cordova build` to build the cordova app for debug
- Run `cordova build --release` to build the cordova app for production
- Run `cordova run android` to run the cordova app on a connected device

## Cordova plugins
Install with `cordova plugin add <plugin_name>` from within the cordova/ folder.
- phonegap-plugin-push
- cordova-plugin-whitelist
- cordova-plugin-statusbar
- cordova-plugin-splashscreen
- cordova-plugin-device
- cordova-plugin-crosswalk-webview

## Supported platforms
* Any modern web browser (Chrome, Firefox, Edge, Safari) by simply hosting it
* Mobile platforms (iOS, Android, Windows, Amazon FireOS/Blackberry) by packaging the app using Cordova
* Desktop platforms (Windows, Mac OS X, Linux) by packaging the app using NW.js

# Platform specific instructions

## Android
### Prerequisites
- Download the [Android SDK](http://developer.android.com/sdk/index.html#Other) (SDK tools only is fine)
### Build
- Run `gulp` to build the web app for production
- Create a keystore named `netplanning` following the official documentation [here](http://developer.android.com/tools/publishing/app-signing.html) and store it in the root app folder
- Run `cordova build android --release` to build the cordova app for production
- Find the package in the folder `platforms/android/build/outputs/apk`

## Windows
### Prerequisites
- A Windows PC (so far)
### Build the Windows production package
- Run `gulp` to build the web app for production
- Run `cordova build windows --release` to build the cordova app for production
- Find the package in the folder `platforms/windows/AppPackages`
### Build
- Run `gulp` to build the web app for production
- Run `cordova build ios --release` to build the cordova app for production

## Amazon FireOS / Blackberry
### Prerequisites
- Download and install the [Amazon WebView API SDK](https://developer.amazon.com/public/solutions/platforms/android-fireos/docs/building-and-testing-your-hybrid-app)
- Following this [instructions](https://cordova.apache.org/docs/en/latest/guide/platforms/amazonfireos/index.html)

### Build
- Run `gulp` to build the web app for production
- Run `cordova build amazon-fireos --release` to build the cordova app for production

## ToDo
List of pending features.

### V1
- ☐ Deregister device when a notification delivery fails
- ☐ Activate periodic planning refresh

### V2
- ☐ Cancel a lesson
- ☐ Calendar view
