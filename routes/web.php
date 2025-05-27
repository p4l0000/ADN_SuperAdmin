<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DivisiController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\MemberController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::resource('member', MemberController::class);
    Route::resource('divisi', DivisiController::class);
    Route::resource('admin', AdminController::class);
    Route::resource('berita', BeritaController::class)->parameters([
        'berita' => 'berita'
    ]);


});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
