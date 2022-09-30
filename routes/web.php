<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('task.index');
});
Route::get('get-task', [TaskController::class, 'index'])->name('get-task');
Route::post('task-store', [TaskController::class, 'store'])->name('task-store');
Route::post('task-complete', [TaskController::class, 'complete'])->name('task-complete');
Route::delete('/task-destroy/{id}', [TaskController::class, 'destroy'])->name('task.destroy');

