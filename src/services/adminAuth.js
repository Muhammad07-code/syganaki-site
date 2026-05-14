import { doc, getDoc } from 'firebase/firestore';
import { getIdTokenResult } from 'firebase/auth';
import { db, isFirebaseConfigured } from '../firebase/config';

export const hasAdminAccess = async (user) => {
  if (!user || !isFirebaseConfigured) return false;

  const token = await getIdTokenResult(user, true);
  if (token.claims?.admin === true || token.claims?.role === 'admin') {
    return true;
  }

  const roleDoc = await getDoc(doc(db, 'adminRoles', user.uid));
  return roleDoc.exists() && roleDoc.data()?.role === 'admin';
};
