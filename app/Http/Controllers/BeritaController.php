<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    /**
     * Display a listing of the berita.
     */
    public function index()
    {
        $berita = Berita::latest()->get();
        
        return Inertia::render('Berita/Berita', [
            'berita' => $berita,
            'flash' => session('flash')
        ]);
    }

    /**
     * Show the form for creating a new berita.
     */
    public function create()
    {
        return Inertia::render('Berita/TambahBerita');
    }

    /**
     * Store a newly created berita in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'judulBerita' => 'required|string|max:255',
                'sampulBerita' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'deskripsiJudul' => 'required|string|max:2000',
            ], [
                'judulBerita.required' => 'Judul Berita harus diisi',
                'judulBerita.max' => 'Judul Berita maksimal 255 karakter',
                'sampulBerita.required' => 'Sampul Berita harus dipilih',
                'sampulBerita.image' => 'Sampul Berita harus berupa gambar',
                'sampulBerita.mimes' => 'Sampul Berita harus berformat jpeg, png, jpg, atau gif',
                'sampulBerita.max' => 'Ukuran Sampul Berita maksimal 2MB',
                'deskripsiJudul.required' => 'Deskripsi Judul harus diisi',
                'deskripsiJudul.max' => 'Deskripsi Judul maksimal 2000 karakter',
            ]);

            // Handle file upload
            $sampulPath = null;
            if ($request->hasFile('sampulBerita')) {
                $file = $request->file('sampulBerita');
                $fileName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $sampulPath = $file->storeAs('berita', $fileName, 'public');
            }

            $berita = new Berita();
            $berita->judul_berita = $validated['judulBerita'];
            $berita->sampul_berita = $sampulPath;
            $berita->deskripsi_judul = $validated['deskripsiJudul'];
            
            $saved = $berita->save();
            
            if ($saved && $berita->id) {
                return redirect()->route('berita.index')->with('flash', [
                    'type' => 'success',
                    'message' => 'Berita berhasil ditambahkan!'
                ]);
            } else {
                // Delete uploaded file if save failed
                if ($sampulPath) {
                    Storage::disk('public')->delete($sampulPath);
                }
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
                'message' => 'Terjadi kesalahan saat menyimpan data berita: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Display the specified berita.
     */
    public function show(Berita $berita)
    {
        return Inertia::render('Berita/Show', [
            'berita' => $berita
        ]);
    }

    /**
     * Show the form for editing the specified berita.
     */
    public function edit(Berita $berita)
    {
        return Inertia::render('Berita/Edit', [
            'berita' => $berita
        ]);
    }

    /**
     * Update the specified berita in storage.
     */
    public function update(Request $request, Berita $berita): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'judulBerita' => 'required|string|max:255',
                'sampulBerita' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'deskripsiJudul' => 'required|string|max:2000',
            ], [
                'judulBerita.required' => 'Judul Berita harus diisi',
                'judulBerita.max' => 'Judul Berita maksimal 255 karakter',
                'sampulBerita.image' => 'Sampul Berita harus berupa gambar',
                'sampulBerita.mimes' => 'Sampul Berita harus berformat jpeg, png, jpg, atau gif',
                'sampulBerita.max' => 'Ukuran Sampul Berita maksimal 2MB',
                'deskripsiJudul.required' => 'Deskripsi Judul harus diisi',
                'deskripsiJudul.max' => 'Deskripsi Judul maksimal 2000 karakter',
            ]);

            $updateData = [
                'judul_berita' => $validated['judulBerita'],
                'deskripsi_judul' => $validated['deskripsiJudul'],
            ];

            // Handle file upload if new file is provided
            if ($request->hasFile('sampulBerita')) {
                // Delete old file
                if ($berita->sampul_berita) {
                    Storage::disk('public')->delete($berita->sampul_berita);
                }

                $file = $request->file('sampulBerita');
                $fileName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $sampulPath = $file->storeAs('berita', $fileName, 'public');
                $updateData['sampul_berita'] = $sampulPath;
            }

            $berita->update($updateData);

            return redirect()->route('berita.index')->with('flash', [
                'type' => 'success',
                'message' => 'Berita berhasil diperbarui!'
            ]);

        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat memperbarui data berita.'
            ])->withInput();
        }
    }

    /**
     * Remove the specified berita from storage.
     */
    public function destroy(Berita $berita): RedirectResponse
    {
        try {
            // Delete associated file
            if ($berita->sampul_berita) {
                Storage::disk('public')->delete($berita->sampul_berita);
            }

            $berita->delete();

            return redirect()->route('berita.index')->with('flash', [
                'type' => 'success',
                'message' => 'Berita berhasil dihapus!'
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat menghapus berita.'
            ]);
        }
    }

}