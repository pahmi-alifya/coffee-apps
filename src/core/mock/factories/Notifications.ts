import {faker} from '@faker-js/faker';
import {
  NotificationType,
  TypeNotifType,
} from '@models/NotificationModel';
import {Factory} from 'miragejs';
import {FactoryDefinition} from 'miragejs/-types';

const NotificationFactory: FactoryDefinition<NotificationType> =
  Factory.extend({
    id_notification(i) {
      return i + 1;
    },
    notification_title() {
      return "Pengembalian Dana Berhasil"
    },
    notification_body() {
      const description = 'Pengembalian Dana untuk transaksi J+2022931664796985037 berhasil. Rp 85.400 telah ditambahkan ke saldo ShopeePay-mu'
      return description
    },
    notification_type() {
      const data = ["Transaksi", "Pengembalian Dana", "Referral", "Announcement"];
      return faker.helpers.arrayElement(data)
    },
    type() {
      const data = [TypeNotifType.Info, TypeNotifType.Promo];
      return faker.helpers.arrayElement(data);
    },
    notification_datetime() {
      return faker.date.past().toISOString();
    },
    is_read() {
      return faker.datatype.boolean();
    },
    deeplink() {
      return faker.internet.url();
    },
  });

export default NotificationFactory;
