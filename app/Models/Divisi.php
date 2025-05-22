<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Divisi extends Model
{
    use HasFactory;

    protected $table = 'divisis';

    protected $fillable = [
        'nama_divisi',
        'deskripsi',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the admins for the divisi.
     */
    public function admins(): HasMany
    {
        return $this->hasMany(Admin::class, 'divisi_id');
    }
}