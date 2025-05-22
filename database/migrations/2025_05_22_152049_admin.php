<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->string('id', 10)->primary();
            $table->string('nama_admin');
            $table->unsignedBigInteger('divisi_id');
            $table->string('email')->unique()->nullable();
            $table->string('phone')->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('divisi_id')->references('id')->on('divisis')->onDelete('cascade');
            
            // Indexes for better performance
            $table->index(['nama_admin']);
            $table->index(['divisi_id']);
            $table->index(['email']);
            $table->index(['created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};