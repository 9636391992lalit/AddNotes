# Notes App - React Native

A multi-user offline notes application built with React Native and Expo.

## Features

- **Authentication**: Sign up and login with unique username and email
- **Multi-User Support**: Multiple users can use the app on the same device
- **Notes Management**: Create, edit, and delete notes
- **Image Support**: Add images from gallery or capture from camera
- **Search & Sort**: Search notes by title/body and sort by date or title
- **Offline Storage**: All data stored locally using AsyncStorage

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on your device:
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator / `a` for Android emulator

## Usage

### Sign Up
- Create a new account with a unique username and email
- Set a password (minimum 4 characters)

### Login
- Login using either your username or email
- Password is required

### Notes
- Tap the "+" button to create a new note
- Tap on a note to edit it
- Swipe or tap delete to remove a note
- Add images from gallery or camera
- Search notes using the search bar
- Sort notes by newest, oldest, or alphabetically

### Logout
- Tap the "Logout" button in the header to switch accounts

## Technical Details

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **Storage**: AsyncStorage for offline data persistence
- **Image Picker**: Expo Image Picker
- **Camera**: Expo Camera

## Project Structure

```
NotesApp/
├── src/
│   ├── context/
│   │   └── AuthContext.js      # Authentication context
│   ├── screens/
│   │   ├── LoginScreen.js      # Login screen
│   │   ├── SignUpScreen.js     # Sign up screen
│   │   ├── NotesListScreen.js  # Notes list with search/sort
│   │   └── NoteEditScreen.js  # Create/edit note screen
│   └── services/
│       └── storageService.js   # AsyncStorage utilities
├── App.js                       # Main app component
└── package.json
```

