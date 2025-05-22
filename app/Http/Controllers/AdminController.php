<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Divisi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::with('divisi')
                      ->latest()
                      ->paginate(10);
        
        return Inertia::render('Admin', [
            'admins' => $admins
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $divisiOptions = Divisi::orderBy('nama_divisi')
                              ->get()
                              ->map(function ($divisi) {
                                  return [
                                      'id' => $divisi->id,
                                      'nama_divisi' => $divisi->nama_divisi,
                                  ];
                              });

        return Inertia::render('TambahAdmin', [
            'divisiOptions' => $divisiOptions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'namaAdmin' => 'required|string|max:255',
            'divisi' => 'required|integer|exists:divisis,id', // Ubah ke integer
        ], [
            'namaAdmin.required' => 'Nama Admin harus diisi',
            'namaAdmin.max' => 'Nama Admin maksimal 255 karakter',
            'divisi.required' => 'Divisi harus dipilih',
            'divisi.integer' => 'Divisi harus berupa angka',
            'divisi.exists' => 'Divisi tidak valid',
        ]);

        try {
            Admin::create([
                'nama_admin' => $validated['namaAdmin'],
                'divisi_id' => $validated['divisi'],
            ]);

            return redirect()->route('admin.index')->with('success', 'Admin berhasil ditambahkan');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menambahkan admin: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        $admin->load('divisi');
        
        return Inertia::render('Admin/Show', [
            'admin' => $admin
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        $admin->load('divisi');
        
        $divisiOptions = Divisi::orderBy('nama_divisi')
                              ->get()
                              ->map(function ($divisi) {
                                  return [
                                      'id' => $divisi->id,
                                      'nama_divisi' => $divisi->nama_divisi,
                                      'kode_divisi' => $divisi->kode_divisi
                                  ];
                              });

        return Inertia::render('Admin/Edit', [
            'admin' => $admin,
            'divisiOptions' => $divisiOptions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        $validated = $request->validate([
            'namaAdmin' => 'required|string|max:255',
            'divisi' => 'required|string|exists:divisis,id',
        ], [
            'namaAdmin.required' => 'Nama Admin harus diisi',
            'namaAdmin.max' => 'Nama Admin maksimal 255 karakter',
            'divisi.required' => 'Divisi harus dipilih',
            'divisi.exists' => 'Divisi tidak valid',
        ]);

        try {
            $admin->update([
                'nama_admin' => $validated['namaAdmin'],
                'divisi_id' => $validated['divisi'],
            ]);

            return redirect()->route('admin.index')->with('success', 'Admin berhasil diperbarui');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal memperbarui admin: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        try {
            $admin->delete();
            return redirect()->route('admin.index')->with('success', 'Admin berhasil dihapus');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus admin: ' . $e->getMessage()]);
        }
    }
}