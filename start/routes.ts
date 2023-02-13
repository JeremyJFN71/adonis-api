/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// API
Route.group(() => {
  // CRUD User
  Route.get('/users', 'UsersController.allUsers')
  Route.get('/users/:id', 'UsersController.oneUser')
  Route.post('/users', 'UsersController.createUser')
  Route.patch('/users/:id', 'UsersController.updateUser')
  Route.delete('/users/:id', 'UsersController.deleteUser')

  // Login
  Route.post('/login', 'UsersController.login')

  // Logout
  Route.get('/logout', 'UsersController.logout')

  // Get Current User Detail
  Route.group(() => {
    Route.get('/me', 'UsersController.getMe')
  }).middleware('auth:api')

  Route.post('/email', 'EmailsController.store')
}).prefix('/api')