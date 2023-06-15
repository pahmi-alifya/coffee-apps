import {Model} from 'miragejs';
import {ModelDefinition} from 'miragejs/-types';

export enum TypeNotifType {
  Info = 'info',
  Promo = 'promo',
}

export type NotificationType = {
  id_notification: number;
  notification_title: string;
  notification_body: string;
  notification_type: string;
  type: TypeNotifType;
  notification_datetime: string;
  is_read: boolean;
  deeplink: string;
};

export const NotificationModel: ModelDefinition<NotificationType> =
  Model.extend({});
