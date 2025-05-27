<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Divisi;
use App\Models\Member;
use App\Models\Berita;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $adminCount = Admin::count();
        $divisiCount = Divisi::count();
        $memberCount = Member::count();
        $latestNews = Berita::latest()->take(3)->get(['id', 'judul_berita', 'sampul_berita']);

        return Inertia::render('Dashboard', [
            'stats' => [
                ['title' => 'Admin', 'count' => $adminCount, 'icon' => 'user', 'color' => 'bg-green-500'],
                ['title' => 'Divisi', 'count' => $divisiCount, 'icon' => 'users', 'color' => 'bg-green-500'],
                ['title' => 'Member', 'count' => $memberCount, 'icon' => 'id-card', 'color' => 'bg-green-500'],
            ],
            'news' => $latestNews,
        ]);
    }
}
