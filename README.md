# netplanning-material-client
NetPlanning Teacher is the unofficial Telelangue app and it is available for PC, MAC, iOS, Android and Windows Phone.

## Installation

- Run in an elevated command line: `npm install --global yo gulp bower cordova nwjs enigmavirtualbox`
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

# Build the Android production package
- Run `gulp` to build the web app for production
- Create a keystore named `netplanning` following the official documentation [here](http://developer.android.com/tools/publishing/app-signing.html) and store it in the root app folder
- Run `cordova build android --release` to build the cordova app for production
- Find the package in the folder `platforms/android/build/outputs/apk`

# Build the Windows production package
- Run `gulp` to build the web app for production
- Run `cordova build windows --release` to build the cordova app for production
- Find the package in the folder `platforms/windows/AppPackages`

# Build the iOS production package
- Run `gulp` to build the web app for production
- Run `cordova build ios --release` to build the cordova app for production

# Build the Blackberry production package
- Run `gulp` to build the web app for production
- Run `cordova build blackberry10 --release` to build the cordova app for production

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
* Mobile platforms (iOS, Android, Windows) by packaging the app using Cordova
* Desktop platforms (Windows, Mac OS X, Linux) by packaging the app using NW.js

## ToDo
List of pending features.

### V1
- ☐ Deregister device when a notification delivery fails
- ☐ Activate periodic planning refresh

### V2
- ☐ Cancel a lesson
- ☐ Calendar view
