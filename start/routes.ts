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


// CRUD User
Route.get('/api/users', 'UsersController.allUsers')
Route.get('/api/users/:id', 'UsersController.oneUser')
Route.post('/api/users', 'UsersController.createUser')
Route.patch('/api/users/:id', 'UsersController.updateUser')
Route.delete('/api/users/:id', 'UsersController.deleteUser')

// Login
Route.post('/api/login', 'UsersController.login')

// Logout
Route.get('/api/logout', 'UsersController.logout')

// Get Current User Detail
Route.group(() => {
  Route.get('/api/me', 'UsersController.getMe')
}).middleware('auth:api')
