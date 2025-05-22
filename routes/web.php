<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DivisiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/member', function () {
    return Inertia::render('Member');
})->middleware(['auth'])->name('member');

Route::get('/berita', function () {
    return Inertia::render('Berita');
})->middleware(['auth'])->name('berita');

Route::get('/tambah-berita', function () {
    return Inertia::render('TambahBerita');
})->middleware(['auth'])->name('berita.add');

Route::get('/tambah-member', function () {
    return Inertia::render('TambahMember');
})->middleware(['auth'])->name('member.add');

Route::resource('divisi', DivisiController::class);
Route::resource('admin', AdminController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
