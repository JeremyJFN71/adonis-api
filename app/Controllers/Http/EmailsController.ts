import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EmailValidator from 'App/Validators/EmailValidator'
import ContactMailer from 'App/Mailers/ContactMailer'

export default class EmailsController {

    async store({request, response}: HttpContextContract){
        let data: any
        try{
            data = await request.validate(EmailValidator)
        } catch(err){
            return response.status(400).json({message: err.message})
        }

        await new ContactMailer(data).send()

        return response.json({
            message: 'Email terkirim',
            from: request.input('email')
        })
    }
}