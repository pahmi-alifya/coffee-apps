import {notification} from '@url';
import {Server} from 'miragejs';
import getNotificationList from './get-notification-list';

const registerNotificationRoutes = (context: Server) => [
  context.get(notification(`v1/notifications/notification_group/:type`), getNotificationList),
];

export default registerNotificationRoutes;
