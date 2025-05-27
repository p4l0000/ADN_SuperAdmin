<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Divisi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Admin::with('divisi')->latest();
        
        $searchQuery = $request->get('q');
        
        if ($searchQuery) {
            // Search across all relevant fields
            $query->where(function ($q) use ($searchQuery) {
                $q->where('id', 'like', '%' . $searchQuery . '%')
                  ->orWhere('nama_admin', 'like', '%' . $searchQuery . '%')
                  ->orWhereHas('divisi', function ($divisiQuery) use ($searchQuery) {
                      $divisiQuery->where('nama_divisi', 'like', '%' . $searchQuery . '%');
                  });
            });
            
            $admins = $query->paginate(50); // Increase limit for search results
        } else {
            $admins = $query->paginate(10);
        }
        
        return Inertia::render('Admin/Admin', [
            'admins' => $admins,
            'flash' => session('flash'),
            'search' => $searchQuery
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

        return Inertia::render('Admin/TambahAdmin', [
            'divisiOptions' => $divisiOptions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'namaAdmin' => 'required|string|max:255',
                'divisi' => 'required|integer|exists:divisis,id',
            ], [
                'namaAdmin.required' => 'Nama Admin harus diisi',
                'namaAdmin.max' => 'Nama Admin maksimal 255 karakter',
                'divisi.required' => 'Divisi harus dipilih',
                'divisi.integer' => 'Divisi harus berupa angka',
                'divisi.exists' => 'Divisi tidak valid',
            ]);

            $admin = new Admin();
            $admin->nama_admin = $validated['namaAdmin'];
            $admin->divisi_id = $validated['divisi'];
            
            $saved = $admin->save();
            
            if ($saved) {
                return redirect()->route('admin.index')->with('flash', [
                    'type' => 'success',
                    'message' => 'Admin berhasil ditambahkan!'
                ]);
            } else {
                throw new \Exception('Data tidak berhasil disimpan');
            }

        } catch (ValidationException $e) {
            \Log::error('Validation Error:', ['errors' => $e->errors()]);
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            \Log::error('Store Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat menyimpan data admin: ' . $e->getMessage()
            ])->withInput();
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
                                      'nama_divisi' => $divisi->nama_divisi
                                  ];
                              });

        return Inertia::render('Admin/EditAdmin', [
            'admin' => $admin,
            'divisiOptions' => $divisiOptions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'namaAdmin' => 'required|string|max:255',
                'divisi' => 'required|integer|exists:divisis,id',
            ], [
                'namaAdmin.required' => 'Nama Admin harus diisi',
                'namaAdmin.max' => 'Nama Admin maksimal 255 karakter',
                'divisi.required' => 'Divisi harus dipilih',
                'divisi.integer' => 'Divisi harus berupa angka',
                'divisi.exists' => 'Divisi tidak valid',
            ]);

            $admin->update([
                'nama_admin' => $validated['namaAdmin'],
                'divisi_id' => $validated['divisi'],
            ]);

            return redirect()->route('admin.index')->with('flash', [
                'type' => 'success',
                'message' => 'Admin berhasil diperbarui!'
            ]);

        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat memperbarui data admin.'
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin): RedirectResponse
    {
        try {
            $admin->delete();

            return redirect()->route('admin.index')->with('flash', [
                'type' => 'success',
                'message' => 'Admin berhasil dihapus!'
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat menghapus admin.'
            ]);
        }
    }
}