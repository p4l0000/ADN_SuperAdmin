<?php

namespace App\Http\Controllers;

use App\Models\Divisi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class DivisiController extends Controller
{
    /**
     * Display a listing of the divisi.
     */
    public function index()
    {
        $divisi = Divisi::withCount('admins')->get();
        
        return Inertia::render('Divisi', [
            'divisi' => $divisi,
            'flash' => session('flash')
        ]);
    }

    /**
     * Show the form for creating a new divisi.
     */
    public function create()
    {
        return Inertia::render('TambahDivisi');
    }

    /**
     * Store a newly created divisi in storage.
     */
   public function store(Request $request): RedirectResponse
{
    try {
        $validated = $request->validate([
            'namaDivisi' => 'required|string|max:255|unique:divisis,nama_divisi', // Pastikan nama tabel benar
            'deskripsiDivisi' => 'required|string|max:1000',
        ], [
            'namaDivisi.required' => 'Nama Divisi harus diisi',
            'namaDivisi.unique' => 'Nama Divisi sudah ada',
            'namaDivisi.max' => 'Nama Divisi maksimal 255 karakter',
            'deskripsiDivisi.required' => 'Deskripsi Divisi harus diisi',
            'deskripsiDivisi.max' => 'Deskripsi Divisi maksimal 1000 karakter',
        ]);

        $divisi = new Divisi();
        $divisi->nama_divisi = $validated['namaDivisi'];
        $divisi->deskripsi = $validated['deskripsiDivisi'];
        
        $saved = $divisi->save();
        
        // Verifikasi data tersimpan
        $count = Divisi::where('nama_divisi', $validated['namaDivisi'])->count();
        if ($saved && $divisi->id) {
            return redirect()->route('divisi.index')->with('flash', [
                'type' => 'success',
                'message' => 'Divisi berhasil ditambahkan!'
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
            'message' => 'Terjadi kesalahan saat menyimpan data divisi: ' . $e->getMessage()
        ])->withInput();
    }
}


    /**
     * Display the specified divisi.
     */
    public function show(Divisi $divisi)
    {
        return Inertia::render('Divisi/Show', [
            'divisi' => $divisi
        ]);
    }

    /**
     * Show the form for editing the specified divisi.
     */
    public function edit(Divisi $divisi)
    {
        return Inertia::render('Divisi/Edit', [
            'divisi' => $divisi
        ]);
    }

    /**
     * Update the specified divisi in storage.
     */
    public function update(Request $request, Divisi $divisi): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'namaDivisi' => 'required|string|max:255|unique:divisi,nama_divisi,' . $divisi->id,
                'deskripsiDivisi' => 'required|string|max:1000',
            ], [
                'namaDivisi.required' => 'Nama Divisi harus diisi',
                'namaDivisi.unique' => 'Nama Divisi sudah ada',
                'namaDivisi.max' => 'Nama Divisi maksimal 255 karakter',
                'deskripsiDivisi.required' => 'Deskripsi Divisi harus diisi',
                'deskripsiDivisi.max' => 'Deskripsi Divisi maksimal 1000 karakter',
            ]);

            $divisi->update([
                'nama_divisi' => $validated['namaDivisi'],
                'deskripsi_divisi' => $validated['deskripsiDivisi'],
            ]);

            return redirect()->route('divisi.index')->with('flash', [
                'type' => 'success',
                'message' => 'Divisi berhasil diperbarui!'
            ]);

        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat memperbarui data divisi.'
            ])->withInput();
        }
    }

    /**
     * Remove the specified divisi from storage.
     */
    public function destroy(Divisi $divisi): RedirectResponse
    {
        try {
            // Check if divisi has related admins
            if ($divisi->admins()->count() > 0) {
                return redirect()->back()->with('flash', [
                    'type' => 'error',
                    'message' => 'Tidak dapat menghapus divisi yang masih memiliki admin terkait.'
                ]);
            }

            $divisi->delete();

            return redirect()->route('divisi.index')->with('flash', [
                'type' => 'success',
                'message' => 'Divisi berhasil dihapus!'
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat menghapus divisi.'
            ]);
        }
    }

}