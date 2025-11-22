# Notes App - React Native

A multi-user offline notes application built with React Native and Expo. This app allows multiple users to create, manage, and organize their notes with image support, all stored locally on the device.

## Features

- **Authentication (Offline Only)**: Sign up and login with unique username and email
- **Multi-User Support**: Multiple users can use the app on the same device
- **Notes Management**: Create, edit, and delete notes with title and body text
- **Image Support**: Add images from gallery or capture from camera (full-size, no cropping)
- **Search & Sort**: Search notes by title/body and sort by date (newest/oldest) or title (A-Z/Z-A)
- **Offline Storage**: All data stored locally using AsyncStorage
- **User Isolation**: Each user sees only their own notes

## Setup Instructions

### Prerequisites

- Node.js (v18.17.0 or higher recommended, v20.19.4+ for best compatibility)
- npm or yarn
- Expo CLI (installed globally or via npx)
- Expo Go app on your mobile device (for development)
- Android Studio (for Android development/APK building)
- Xcode (for iOS development, macOS only)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NotesApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   If you encounter peer dependency warnings, use:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the Expo development server**
   ```bash
   npm start
   ```
   
   Or use:
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - **Android**: Press `a` or scan the QR code with Expo Go app
   - **iOS**: Press `i` or scan the QR code with Expo Go app
   - **Web**: Press `w` (limited functionality)

### Building Android APK

To build a production APK for Android:

1. **Install EAS CLI** (Expo Application Services)
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

4. **Build the APK**
   ```bash
   eas build --platform android --profile preview
   ```
   
   This will create a preview APK that can be installed directly on Android devices.

   For a production build:
   ```bash
   eas build --platform android --profile production
   ```

5. **Alternative: Local Build (requires Android Studio)**
   ```bash
   npx expo prebuild
   cd android
   ./gradlew assembleRelease
   ```
   
   The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

## Libraries Used

### Core Dependencies

- **expo** (~54.0.0) - Expo SDK framework
- **react** (19.1.0) - React library
- **react-native** (0.81.5) - React Native framework

### Navigation

- **@react-navigation/native** (^6.1.9) - Navigation library
- **@react-navigation/native-stack** (^6.9.17) - Stack navigator
- **react-native-screens** (~4.16.0) - Native screen components
- **react-native-safe-area-context** (~5.6.0) - Safe area handling

### Storage & Data

- **@react-native-async-storage/async-storage** (2.2.0) - Local storage for offline data persistence

### Media & Camera

- **expo-image-picker** (~17.0.8) - Image selection from gallery
- **expo-camera** (~17.0.9) - Camera access for capturing photos

### UI & Utilities

- **expo-status-bar** (~3.0.8) - Status bar component
- **react-native-vector-icons** (^10.0.2) - Icon library (currently not actively used)

### Development Dependencies

- **@babel/core** (^7.20.0) - Babel compiler
- **babel-preset-expo** (~54.0.0) - Expo Babel preset

## Project Structure

```
NotesApp/
├── src/
│   ├── context/
│   │   └── AuthContext.js          # Authentication state management
│   ├── screens/
│   │   ├── LoginScreen.js          # Login screen (username/email support)
│   │   ├── SignUpScreen.js         # Registration screen
│   │   ├── NotesListScreen.js      # Notes list with search and sort
│   │   └── NoteEditScreen.js      # Create/edit note with image support
│   └── services/
│       └── storageService.js      # AsyncStorage utilities for users and notes
├── App.js                          # Main app component with navigation
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Usage

### Sign Up
1. Open the app
2. Tap "Sign Up"
3. Enter a unique username and email
4. Set a password (minimum 4 characters)
5. Confirm password and tap "Sign Up"

### Login
1. Enter your username or email
2. Enter your password
3. Tap "Login"

### Creating Notes
1. Tap the "+" button (bottom right)
2. Enter a title and body text
3. Optionally add an image:
   - Tap "Select from Gallery" to choose from photos
   - Tap "Take Photo" to capture with camera
4. Tap "Save" in the header

### Editing Notes
1. Tap on any note in the list
2. Modify title, body, or image
3. Tap "Save" to update

### Deleting Notes
1. Tap on a note
2. Tap "Delete" button
3. Confirm deletion

### Searching Notes
- Use the search bar at the top
- Search filters by title or body text
- Works in real-time as you type

### Sorting Notes
- **Newest**: Sort by most recently updated (default)
- **Oldest**: Sort by least recently updated
- **A-Z**: Sort alphabetically by title
- **Z-A**: Sort reverse alphabetically by title
- Only one sort option can be active at a time

### Logout
- Tap "Logout" in the header to switch accounts
- All data remains stored locally per user

## Known Issues & Limitations

1. **Node Version Compatibility**
   - The project uses Expo SDK 54 which recommends Node.js 20.19.4+
   - Current setup works with Node.js 18.17.0 but may show warnings
   - **Workaround**: Upgrade to Node.js 20+ for best compatibility

2. **Image Storage**
   - Images are stored as file URIs, not base64
   - Images may not persist if the device storage is cleared
   - Large images may cause performance issues on older devices

3. **Password Security**
   - Passwords are stored in plain text in AsyncStorage
   - **Not recommended for production use** - should use encryption or secure storage

4. **Data Persistence**
   - All data is stored locally on the device
   - No cloud backup or sync functionality
   - Data is lost if the app is uninstalled

5. **Multi-User Limitation**
   - Users are identified only by username/email
   - No user profile management or password recovery
   - No account deletion feature

6. **Search Functionality**
   - Search is case-sensitive for the search query but case-insensitive for matching
   - No advanced search filters (date range, tags, etc.)

7. **Sorting Behavior**
   - Only one sort option can be active at a time
   - Cannot combine multiple sort criteria simultaneously

8. **Platform-Specific Issues**
   - iOS: Camera permissions may require manual approval in device settings
   - Android: Some devices may require additional permissions for media access

## Future Improvements

- [ ] Implement password encryption
- [ ] Add cloud backup/sync functionality
- [ ] Add note categories/tags
- [ ] Implement note sharing between users
- [ ] Add rich text editing
- [ ] Implement note export (PDF, text file)
- [ ] Add dark mode support
- [ ] Improve image compression and storage
- [ ] Add biometric authentication
- [ ] Implement note templates

## Troubleshooting

### App won't start
- Clear Metro bundler cache: `npx expo start --clear`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

### Images not loading
- Check camera/gallery permissions in device settings
- Restart the app after granting permissions
- Ensure sufficient device storage space

### Build errors
- Ensure all dependencies are installed: `npm install --legacy-peer-deps`
- Clear Expo cache: `npx expo start --clear`
- Check Expo SDK version compatibility

## License

This project is created for educational purposes as part of a React Native assignment.

## Contact & Support

For issues or questions, please open an issue in the GitHub repository.
