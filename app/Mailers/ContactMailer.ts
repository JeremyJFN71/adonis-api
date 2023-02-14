import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export default class ContactMailer extends BaseMailer {
  constructor(private message: {email: string, name: string, message: string}){
    super()
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  /**
   * The prepare method is invoked automatically when you run
   * "ContactMailer.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .from(Env.get('SMTP_USERNAME'))
      .to(Env.get('DESTINATION_EMAIL'))
      .subject(`Portfolio | ${this.message.name}`)
      .text(
        `${this.message.message}

from ${this.message.email}`
      )
  }
}
