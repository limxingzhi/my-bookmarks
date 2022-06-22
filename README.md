# My Bookmarks

My Bookmarks is a bookmark manager built with React and firebase. If you wish to use a different service, feel free to swap out the data layer at `src/data.crud`.

To integrate with firebase, provide a `.env` file in the root directory with the following options from the [official documentation](https://firebase.google.com/docs/web/setup#add-sdks-initialize):
```env
VITE_FIREBASE_API_KEY=****
VITE_FIREBASE_AUTH_DOMAIN=****
VITE_FIREBASE_PROJECT_ID=****
VITE_FIREBASE_STORAGE_BUCKET=****
VITE_FIREBASE_MESSAGING_SENDER_ID=****
VITE_FIREBASE_APP_ID=****
VITE_FIREBASE_DATABAES_URL=****
```

## Made with
 - [`@emotion/css`](https://emotion.sh/docs/introduction)
 - [`@mui/material`](https://mui.com)
 - [`date-fns`](https://date-fns.org)
