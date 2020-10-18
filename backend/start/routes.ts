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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.post('/login', 'AuthController.login');

Route.resource('/users', 'UsersController').only(['store']);
Route.resource('/users', 'UsersController').apiOnly().middleware({ '*': 'auth' }).only(['update', 'destroy']);
Route.get('/users/request-password-change', 'UsersController.requestPasswordChange');
Route.post('/users/change-password', 'UsersController.changePassword');

Route.resource('/trades', 'TradesController').apiOnly().middleware({ '*': 'auth' });

Route.get('/request-verification-email', 'AccountVerificationController.requestEmail').middleware('auth');
Route.get('/verify', 'AccountVerificationController.verify');
