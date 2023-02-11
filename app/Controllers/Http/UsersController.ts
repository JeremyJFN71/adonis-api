import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import UserValidator from 'App/Validators/UserValidator'


export default class UsersController {
    // Get all Users
    async allUsers({response}:HttpContextContract){
        const users = await User.all()
        return response.json(users)
    }

    // Get One User by ID
    async oneUser({request, response}:HttpContextContract){
        const user = await User.find(request.param('id'))
        if(!user){
            return response.status(400).json({message: 'User not found'})
        }

        return response.json(user)
    }

    // Create User
    async createUser({request, response}:HttpContextContract) {
        // Validation
        const payload = await request.validate(UserValidator)
        payload.password = await Hash.make(payload.password)

        const user = await User.create(payload)
        return response.json(user)
    }

    // Update User
    async updateUser({request, response}:HttpContextContract){
        const user = await User.find(request.param('id'))
        if(!user){
            return response.status(400).json({message: 'User not found'})
        }

        user?.merge(request.body()).save()
        return response.json({message: 'User has been updated'})
    }

    // Delete User
    async deleteUser({request, response}:HttpContextContract){
        const user = await User.find(request.param('id'))
        if(!user){
            return response.status(400).json({message: 'User not found'})
        }

        user?.delete()
        return response.json({message: 'User has been deleted'})
    }

    // Login
    async login({auth, request, response}:HttpContextContract){
        const username = request.input('username')
        const password = request.input('password')

        try {
            const token = await auth.use('api').attempt(username, password, {
                expiresIn: '1 days'
            })
            return token
        } catch {
            return response.status(401).json({message: 'Invalid credentials'})
        }
    }

    // Get Me
    getMe({auth, response}:HttpContextContract){
        return response.json(auth.user)
    }

    async logout({auth, response}:HttpContextContract){
        await auth.use('api').revoke()
        return response.json({message: 'You have been logged out'})
    }
}
