<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Berita extends Model
{
    use HasFactory;

    // Nama tabel (opsional jika sudah sesuai dengan konvensi Laravel)
    protected $table = 'beritas';

    // Mass assignable fields
    protected $fillable = [
        'judul_berita',
        'sampul_berita',
        'deskripsi_judul',
    ];

    // Akses URL untuk file sampul_berita
    public function getSampulBeritaUrlAttribute()
    {
        if ($this->sampul_berita) {
            return Storage::disk('public')->url($this->sampul_berita);
        }
        return null;
    }
}
