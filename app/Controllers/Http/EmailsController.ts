import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from "@ioc:Adonis/Addons/Mail"
import Env from '@ioc:Adonis/Core/Env'

export default class EmailsController {

    async store({request, response}: HttpContextContract){
        await Mail.send((message) => {
            message
                .from(request.input('email'))
                .to(Env.get('DESTINATION_EMAIL'))
                .subject(request.input('name'))
                .text(request.input('message'))
            })

        return response.json({
            message: 'Email terkirim',
            subject: request.input('name')
        })
    }
}