# Submission Checklist

Use this checklist to ensure all requirements are met before submission.

## Required Items

### 1. GitHub Repository
- [ ] Repository is created and accessible
- [ ] All project files are committed and pushed
- [ ] README.md is complete and accurate
- [ ] Repository link is ready to share

### 2. Android APK
- [ ] APK file is built (release version)
- [ ] APK is added to the repository (in `releases/` folder or root)
- [ ] APK download link is available
- [ ] APK is tested and working on Android device

### 3. README.md Contents
- [ ] **Setup Instructions** ✓
  - Prerequisites listed
  - Installation steps provided
  - Running instructions included
  - APK build instructions included

- [ ] **Libraries Used** ✓
  - All dependencies listed
  - Versions specified
  - Purpose of each library explained

- [ ] **Known Issues** ✓
  - All known limitations documented
  - Workarounds provided where applicable
  - Future improvements listed

## Quick Submission Format

When submitting, provide:

```
GitHub Repository: [Your repository URL]

APK Download: [Direct link to APK file]

README: Included in repository
```

## Pre-Submission Testing

- [ ] App runs without crashes
- [ ] All features work as expected:
  - [ ] Sign up works
  - [ ] Login works (username and email)
  - [ ] Create note works
  - [ ] Edit note works
  - [ ] Delete note works
  - [ ] Image selection works
  - [ ] Camera capture works
  - [ ] Search works
  - [ ] Sort works (all 4 options)
  - [ ] Logout works
- [ ] APK installs and runs on Android device
- [ ] No console errors in development mode
- [ ] README is clear and complete

## File Structure Verification

Ensure your repository has:
```
NotesApp/
├── README.md                    ✓ Required
├── BUILD_INSTRUCTIONS.md        (Optional helper)
├── GITHUB_SETUP.md             (Optional helper)
├── SUBMISSION_CHECKLIST.md      (This file)
├── releases/
│   └── app-release.apk          ✓ Required
├── src/
│   ├── context/
│   ├── screens/
│   └── services/
├── App.js
├── app.json
├── package.json
├── babel.config.js
└── .gitignore
```

## Final Steps

1. Review README.md one more time
2. Test the APK on a physical Android device
3. Verify all links work
4. Double-check repository is accessible
5. Submit!

## Notes

- The APK should be a release build, not debug
- Make sure the repository is public or accessible to your instructor
- Include clear instructions for building the APK if needed
- Document any special requirements or setup steps

