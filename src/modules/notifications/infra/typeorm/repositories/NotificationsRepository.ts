import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private omrRepository: MongoRepository<Notification>;

  constructor() {
    this.omrRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.omrRepository.create({
      content,
      recipient_id,
    });

    await this.omrRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
