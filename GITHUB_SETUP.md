# GitHub Repository Setup Guide

Follow these steps to set up your GitHub repository and submit your project.

## 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it (e.g., "notes-app-react-native")
5. Choose Public or Private
6. **Do NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## 2. Initialize Git and Push to GitHub

Open terminal in your project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: React Native Notes App"

# Add remote repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 3. Add APK to Repository

### Option A: Upload via GitHub Web Interface

1. Go to your repository on GitHub
2. Click "Add file" > "Upload files"
3. Drag and drop your APK file
4. Commit the file with message "Add Android APK release"
5. Click "Commit changes"

### Option B: Add via Git

```bash
# Create a releases folder (optional but recommended)
mkdir releases
# Move your APK to releases folder
# Then:
git add releases/app-release.apk
git commit -m "Add Android APK release"
git push
```

### Recommended Structure

```
NotesApp/
├── releases/
│   └── app-release.apk    # Your APK file
├── src/
├── README.md
└── ...
```

## 4. Create a Release (Optional but Recommended)

1. Go to your repository on GitHub
2. Click "Releases" on the right sidebar
3. Click "Create a new release"
4. Tag version: `v1.0.0`
5. Release title: `Notes App v1.0.0`
6. Description: Brief description of the app
7. Attach the APK file
8. Click "Publish release"

## 5. Final Checklist

Before submission, ensure:

- [ ] README.md is complete with setup instructions
- [ ] All libraries are listed in README
- [ ] Known issues are documented
- [ ] APK file is included in the repository
- [ ] .gitignore is properly configured
- [ ] Code is properly formatted
- [ ] No sensitive information (API keys, passwords) in code
- [ ] Repository is accessible (public or shared with instructor)

## 6. Submission

Provide the following:
1. **GitHub repository link**: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
2. **APK download link**: Direct link to the APK file in your repository

### Direct APK Link Format
If APK is in releases folder:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/raw/main/releases/app-release.apk
```

If APK is in root:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/raw/main/app-release.apk
```

## Notes

- Keep the repository organized and professional
- Use meaningful commit messages
- Don't commit `node_modules/` (already in .gitignore)
- Don't commit sensitive files like keystores
- The APK should be the final release version, not debug

