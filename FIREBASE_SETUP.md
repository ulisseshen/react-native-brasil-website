# Firebase Hosting Setup for PR Previews

This guide will help you set up Firebase Hosting with automatic PR preview deployments.

## Prerequisites

- A Google account
- Access to the GitHub repository settings
- Firebase CLI installed (optional, for local testing)

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "react-native-brasil-website")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Once created, note your **Project ID** (found in Project Settings)

## Step 2: Enable Firebase Hosting

1. In the Firebase Console, select your project
2. Go to **Build** → **Hosting** in the left sidebar
3. Click "Get Started" and follow the wizard
4. You don't need to install the CLI or deploy manually - GitHub Actions will handle this

## Step 3: Create a Firebase Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project from the dropdown
3. Navigate to **IAM & Admin** → **Service Accounts**
4. Click "Create Service Account"
5. Name it something like "github-actions-deployer"
6. Click "Create and Continue"
7. Grant the following roles:
   - **Firebase Hosting Admin** (for deploying to hosting)
   - **Service Account User** (for preview channels)
8. Click "Continue" then "Done"
9. Click on the newly created service account
10. Go to the **Keys** tab
11. Click "Add Key" → "Create new key"
12. Choose **JSON** format
13. Click "Create" - a JSON file will download
14. **Keep this file secure!** It contains credentials for your Firebase project

## Step 4: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click "New repository secret"
4. Add the following secrets:

### Secret 1: FIREBASE_SERVICE_ACCOUNT
- **Name**: `FIREBASE_SERVICE_ACCOUNT`
- **Value**: Copy and paste the **entire contents** of the JSON file you downloaded in Step 3

### Secret 2: FIREBASE_PROJECT_ID
- **Name**: `FIREBASE_PROJECT_ID`
- **Value**: Your Firebase Project ID (e.g., `react-native-brasil-website`)

## Step 5: Update Firebase Configuration

Edit the `.firebaserc` file in the repository root:

```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

Replace `"your-firebase-project-id"` with your actual Firebase Project ID.

## Step 6: Test the Setup

1. Create a new pull request or push changes to an existing PR
2. Go to the **Actions** tab in your GitHub repository
3. You should see the "Firebase PR Preview" workflow running
4. Once complete, a comment will be added to your PR with the preview URL
5. The preview URL will look like: `https://your-project--pr-123-abc123.web.app`

## How It Works

### Automatic PR Previews

- **When a PR is opened/updated**: GitHub Actions builds your site and deploys it to a unique Firebase Hosting preview channel
- **Preview URL format**: `https://PROJECT_ID--pr-NUMBER-HASH.web.app`
- **Expiration**: Preview channels expire after 7 days
- **Cleanup**: When a PR is closed/merged, the preview channel is automatically deleted

### Build Configuration

The workflow uses `yarn build:fast` with the `PREVIEW_DEPLOY=true` flag for faster preview builds. You can customize this in `.github/workflows/firebase-preview.yml` if needed.

## Troubleshooting

### Build fails with "Out of memory"
The workflow is configured with 8GB memory (`NODE_OPTIONS: --max_old_space_size=8192`). If you still encounter issues, you may need to increase this value.

### Preview deployment fails
1. Verify your GitHub secrets are correctly set
2. Check that the service account has the necessary permissions
3. Ensure the `.firebaserc` file has the correct Project ID

### Preview URL not working
1. Check that Firebase Hosting is enabled in your Firebase project
2. Verify the build output directory is correct (`website/build`)
3. Review the workflow logs in GitHub Actions

## Local Testing (Optional)

To test Firebase Hosting locally:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Build your site:
   ```bash
   yarn build
   ```

4. Serve locally:
   ```bash
   firebase serve
   ```

5. Deploy to production:
   ```bash
   firebase deploy
   ```

## Production Deployment

The current setup only handles PR previews. For production deployments to Firebase Hosting:

1. Update `.github/workflows/firebase-preview.yml` to add a production deployment job that triggers on pushes to `main`
2. Or use the Firebase CLI manually: `firebase deploy --only hosting`

## Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions for Firebase](https://github.com/FirebaseExtended/action-hosting-deploy)
- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
