import container from '../../Container';
import mailConfig from '@config/mail';

import IMailSender from './models/IMailSender';
import EtherealMailSender from './implementations/EtherealMailSender';
import SESMailSender from './implementations/SESMailSender';

const creators = {
  ethereal: () => new EtherealMailSender(container.get('MailTemplate')),
  ses: () => new SESMailSender(container.get('MailTemplate')),
};

container.registry<IMailSender>('MailSender', creators[mailConfig.driver]);
