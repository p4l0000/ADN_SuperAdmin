<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Admin extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'id',
        'nama_admin',
        'divisi_id',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = self::generateUniqueId();
            }
        });
    }

    /**
     * Generate a unique 10-digit random ID.
     */
    public static function generateUniqueId()
    {
        do {
            // Generate random 10-digit number
            $id = str_pad(mt_rand(1, 9999999999), 10, '0', STR_PAD_LEFT);
        } while (self::where('id', $id)->exists());

        return $id;
    }

    /**
     * Get the divisi that owns the admin.
     */
    public function divisi(): BelongsTo
    {
        return $this->belongsTo(Divisi::class, 'divisi_id');
    }
}