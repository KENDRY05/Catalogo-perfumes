<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Marca; 

class MarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $marcas = Marca::all();

        return response()->json($marcas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $request->validate([
        'nombre' => 'required|max:100',
        'pais' => 'nullable|max:100',
        'descripcion' => 'nullable'
    ]);

    $marca = Marca::create([
        'nombre' => $request->nombre,
        'pais' => $request->pais,
        'descripcion' => $request->descripcion
    ]);

    return response()->json([
        'mensaje' => 'Marca creada correctamente',
        'marca' => $marca
    ], 201);
}

    /**
     * Display the specified resource.
     */
   public function show(string $id)
{
    $marca = Marca::find($id);

    if (!$marca) {
        return response()->json([
            'mensaje' => 'Marca no disponible'
        ], 404);
    }

    return response()->json($marca);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $marca = Marca::find($id);

    if (!$marca) {
        return response()->json([
            'mensaje' => 'Marca no disponible'
        ], 404);
    }

    $request->validate([
        'nombre' => 'required|max:100',
         'pais' => 'nullable|max:100',
        'descripcion' => 'nullable'
    ]);

    $marca->update([
        'nombre' => $request->nombre,
         'pais' => $request->pais,
        'descripcion' => $request->descripcion
    ]);

    return response()->json([
        'mensaje' => 'Marca actualizada correctamente',
        'Marca' => $marca
    ]);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    $marca = Marca::find($id);

    if (!$marca) {
        return response()->json([
            'mensaje' => 'Marca no disponible'
        ], 404);
    }

    $marca->delete();

    return response()->json([
        'mensaje' => 'Marca eliminada correctamente'
    ]);
}
}
