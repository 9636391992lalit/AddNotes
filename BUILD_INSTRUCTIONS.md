# Android APK Build Instructions

This guide explains how to build a release APK for Android.

## Method 1: Using EAS Build (Recommended)

EAS Build is Expo's cloud build service that handles the build process for you.

### Prerequisites
- Expo account (free)
- EAS CLI installed

### Steps

1. **Install EAS CLI globally**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure the project**
   ```bash
   eas build:configure
   ```
   This creates an `eas.json` file in your project.

4. **Build the APK (Preview)**
   ```bash
   eas build --platform android --profile preview
   ```
   - This creates a preview APK that can be installed directly
   - The build will be uploaded to Expo's servers
   - You'll get a download link when the build completes

5. **Build the APK (Production)**
   ```bash
   eas build --platform android --profile production
   ```
   - This creates a production APK signed with a release key
   - Requires additional setup for signing keys

### Download the APK
- After the build completes, you'll receive a download link
- Download the APK file
- Transfer it to your Android device
- Enable "Install from Unknown Sources" in device settings
- Install the APK

## Method 2: Local Build (Advanced)

This method requires Android Studio and Android SDK to be installed.

### Prerequisites
- Android Studio installed
- Android SDK configured
- Java JDK installed

### Steps

1. **Generate native Android project**
   ```bash
   npx expo prebuild
   ```
   This creates the `android/` folder with native code.

2. **Navigate to Android directory**
   ```bash
   cd android
   ```

3. **Build the APK**
   ```bash
   ./gradlew assembleRelease
   ```
   On Windows:
   ```bash
   gradlew.bat assembleRelease
   ```

4. **Find the APK**
   The APK will be located at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

5. **Sign the APK (Optional but recommended)**
   For production, you should sign the APK with a keystore:
   ```bash
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
   ```

## Method 3: Using Expo Development Build

For testing during development:

1. **Create a development build**
   ```bash
   eas build --profile development --platform android
   ```

2. **Install on device**
   - Download and install the development build
   - Run `npx expo start --dev-client` to connect

## Notes

- **Preview APK**: Can be installed directly, good for testing
- **Production APK**: Requires proper signing, for app store distribution
- **APK Size**: Typically 20-50 MB depending on included assets
- **Build Time**: EAS builds take 10-20 minutes, local builds vary

## Troubleshooting

### Build fails with "SDK not found"
- Ensure Android SDK is properly installed
- Set ANDROID_HOME environment variable

### APK won't install
- Check if device allows installation from unknown sources
- Verify the APK is not corrupted (re-download)
- Ensure minimum Android version is supported (API 21+)

### Signing errors
- Ensure keystore file exists and is accessible
- Verify keystore password and alias are correct

