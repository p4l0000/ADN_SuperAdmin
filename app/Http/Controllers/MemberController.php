<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Divisi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::with('divisi')->latest()->paginate(10);
        
        return Inertia::render('Member', [
            'members' => $members,
            'flash' => session('flash')
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
                                      'nama_divisi' => $divisi->nama_divisi
                                  ];
                              });

        return Inertia::render('TambahMember', [
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
                'namaMember' => 'required|string|max:255',
                'divisi' => 'required|integer|exists:divisis,id',
                'status' => 'required|in:Aktif,Non Aktif',
            ], [
                'namaMember.required' => 'Nama Member harus diisi',
                'namaMember.max' => 'Nama Member maksimal 255 karakter',
                'divisi.required' => 'Divisi harus dipilih',
                'divisi.integer' => 'Divisi harus berupa angka',
                'divisi.exists' => 'Divisi tidak valid',
                'status.required' => 'Status harus dipilih',
                'status.in' => 'Status harus Aktif atau Non Aktif',
            ]);

            $member = new Member();
            $member->nama_member = $validated['namaMember'];
            $member->divisi_id = $validated['divisi'];
            $member->status = $validated['status'];
            
            $saved = $member->save();
            
            if ($saved && $member->id) {
                return redirect()->route('member.index')->with('flash', [
                    'type' => 'success',
                    'message' => 'Member berhasil ditambahkan!'
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
                'message' => 'Terjadi kesalahan saat menyimpan data member: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        $member->load('divisi');
        
        return Inertia::render('Member/Show', [
            'member' => $member
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        $member->load('divisi');
        
        $divisiOptions = Divisi::orderBy('nama_divisi')
                              ->get()
                              ->map(function ($divisi) {
                                  return [
                                      'id' => $divisi->id,
                                      'nama_divisi' => $divisi->nama_divisi
                                  ];
                              });

        return Inertia::render('Member/Edit', [
            'member' => $member,
            'divisiOptions' => $divisiOptions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'namaMember' => 'required|string|max:255',
                'divisi' => 'required|integer|exists:divisis,id',
                'status' => 'required|in:Aktif,Non Aktif',
            ], [
                'namaMember.required' => 'Nama Member harus diisi',
                'namaMember.max' => 'Nama Member maksimal 255 karakter',
                'divisi.required' => 'Divisi harus dipilih',
                'divisi.integer' => 'Divisi harus berupa angka',
                'divisi.exists' => 'Divisi tidak valid',
                'status.required' => 'Status harus dipilih',
                'status.in' => 'Status harus Aktif atau Non Aktif',
            ]);

            $member->update([
                'nama_member' => $validated['namaMember'],
                'divisi_id' => $validated['divisi'],
                'status' => $validated['status'],
            ]);

            return redirect()->route('member.index')->with('flash', [
                'type' => 'success',
                'message' => 'Member berhasil diperbarui!'
            ]);

        } catch (ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat memperbarui data member.'
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member): RedirectResponse
    {
        try {
            $member->delete();

            return redirect()->route('member.index')->with('flash', [
                'type' => 'success',
                'message' => 'Member berhasil dihapus!'
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('flash', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat menghapus member.'
            ]);
        }
    }
}