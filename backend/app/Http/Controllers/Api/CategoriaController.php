<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $categorias = Categoria::all();

    return response()->json($categorias);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $request->validate([
        'nombre' => 'required|max:100',
        'descripcion' => 'nullable'
    ]);

    $categoria = Categoria::create([
        'nombre' => $request->nombre,
        'descripcion' => $request->descripcion
    ]);

    return response()->json([
        'mensaje' => 'Categoría creada correctamente',
        'categoria' => $categoria
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    $categoria = Categoria::find($id);

    if (!$categoria) {
        return response()->json([
            'mensaje' => 'Categoría no encontrada'
        ], 404);
    }

    return response()->json($categoria);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $categoria = Categoria::find($id);

    if (!$categoria) {
        return response()->json([
            'mensaje' => 'Categoría no encontrada'
        ], 404);
    }

    $request->validate([
        'nombre' => 'required|max:100',
        'descripcion' => 'nullable'
    ]);

    $categoria->update([
        'nombre' => $request->nombre,
        'descripcion' => $request->descripcion
    ]);

    return response()->json([
        'mensaje' => 'Categoría actualizada correctamente',
        'categoria' => $categoria
    ]);
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $categoria = Categoria::find($id);

    if (!$categoria) {
        return response()->json([
            'mensaje' => 'Categoría no encontrada'
        ], 404);
    }

    $categoria->delete();

    return response()->json([
        'mensaje' => 'Categoría eliminada correctamente'
    ]);
}
}
