import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { markNotificationsRead } from '../services/notificationService';

/**
 * Automatically marks all unread notifications of the given type(s) as read
 * when the section page mounts. Relies on Outlet context provided by AdminLayout.
 *
 * @param {string|string[]} notificationTypes - e.g. 'application', 'message', 'upload'
 */
const useMarkSectionRead = (notificationTypes) => {
  // Outlet context may not be available outside AdminLayout – guard safely
  let context;
  try {
    context = useOutletContext();
  } catch {
    context = null;
  }

  const user = context?.user ?? null;
  const notifications = context?.notifications ?? [];

  const types = Array.isArray(notificationTypes) ? notificationTypes : [notificationTypes];

  useEffect(() => {
    if (!user && !notifications.length) return;

    const unreadIds = notifications
      .filter((n) => !n.read && types.includes(n.type))
      .map((n) => n.id);

    if (!unreadIds.length) return;

    markNotificationsRead(user, unreadIds).catch((err) => {
      console.warn('Failed to mark notifications read:', err);
    });
    // Run only when notifications list changes (new items loaded) or user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications, user]);
};

export default useMarkSectionRead;
