import { ObjectID } from 'mongodb';

import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';
import Notification from '../../infra/typeorm/schemas/Notification';
import INotificationsRepository from '../INotificationsRepository';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
