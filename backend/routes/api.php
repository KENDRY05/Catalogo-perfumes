<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\MarcaController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\UsuarioController;


// ==========================================
// AUTENTICACIÓN
// ==========================================

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// ==========================================
// PRODUCTOS - CONSULTA PÚBLICA
// ==========================================

Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{producto}', [ProductoController::class, 'show']);


// ==========================================
// RUTAS SOLO PARA ADMINISTRADORES
// ==========================================

Route::middleware(['auth:sanctum', 'admin'])->group(function () {

    // PRODUCTOS
    Route::post('/productos', [ProductoController::class, 'store']);
    Route::put('/productos/{producto}', [ProductoController::class, 'update']);
    Route::patch('/productos/{producto}', [ProductoController::class, 'update']);
    Route::delete('/productos/{producto}', [ProductoController::class, 'destroy']);

    // CATEGORÍAS
    Route::apiResource('categorias', CategoriaController::class);

    // MARCAS
    Route::apiResource('marcas', MarcaController::class);

    // USUARIOS
    Route::apiResource('usuarios', UsuarioController::class);
});


// ==========================================
// MENSAJE DE PRUEBA
// ==========================================

Route::get('/mensaje', function () {
    return response()->json([
        'mensaje' => 'Hola desde Laravel'
    ]);
});