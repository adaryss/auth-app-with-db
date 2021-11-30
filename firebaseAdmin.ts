import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.DB_FB_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.DB_FB_ADMIN_CLIENT_EMAIL,
      projectId: process.env.DB_FB_ADMIN_PROJEC_ID,
    }),
  });
}

export { firebaseAdmin };
