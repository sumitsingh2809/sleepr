import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  async notifyEmail(payload: NotifyEmailDto) {
    const { email } = payload;
    console.log(email);
  }
}
