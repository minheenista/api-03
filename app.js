const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//arreglo de objeto de categorias
let categorias = [
    { id: 1, nombre: "Cocina", descripcion: "Elementos de cocina" },
    { id: 2, nombre: "Limpieza", descripcion: "Elementos de limpieza" },
    { id: 3, nombre: "Oficina", descripcion: "Elementos de oficina" },
    { id: 4, nombre: "Baño", descripcion: "Elementos de baño" },
    { id: 5, nombre: "Herramientas", descripcion: "Elementos de herramientas" },
    { id: 6, nombre: "Jardineria", descripcion: "Elementos de jardineria" },
    { id: 7, nombre: "Electrodomesticos", descripcion: "Elementos de electrodomesticos" },
    { id: 8, nombre: "Muebles", descripcion: "Elementos de muebles" },
    { id: 9, nombre: "Decoracion", descripcion: "Elementos de decoracion" },
    { id: 10, nombre: "Iluminacion", descripcion: "Elementos de iluminacion" },
    { id: 11, nombre: "Mascotas", descripcion: "Elementos de mascotas" },
    { id: 12, nombre: "Niños", descripcion: "Elementos de niños" },
    { id: 13, nombre: "Deportes", descripcion: "Elementos de deportes" },
    { id: 14, nombre: "Tecnologia", descripcion: "Elementos de tecnologia" },
    { id: 15, nombre: "Moda", descripcion: "Elementos de moda" },
    { id: 16, nombre: "Belleza", descripcion: "Elementos de belleza" },
    { id: 17, nombre: "Salud", descripcion: "Elementos de salud" },
    { id: 18, nombre: "Libros", descripcion: "Elementos de libros" },
    { id: 19, nombre: "Musica", descripcion: "Elementos de musica" },
    { id: 20, nombre: "Peliculas", descripcion: "Elementos de peliculas" },
    { id: 21, nombre: "Juguetes", descripcion: "Elementos de juguetes" },
    { id: 22, nombre: "Bebes", descripcion: "Elementos de bebes" },
    { id: 23, nombre: "Alimentos", descripcion: "Elementos de alimentos" },
    { id: 24, nombre: "Bebidas", descripcion: "Elementos de bebidas" },
    { id: 25, nombre: "Vinos", descripcion: "Elementos de vinos" },
    { id: 26, nombre: "Cervezas", descripcion: "Elementos de cervezas" },
    { id: 27, nombre: "Licores", descripcion: "Elementos de licores" },
    { id: 28, nombre: "Farmacia", descripcion: "Elementos de farmacia" },
    { id: 30, nombre: "Papeleria", descripcion: "Elementos de papeleria" },
    { id: 31, nombre: "Regalos", descripcion: "Elementos de regalos" },
    { id: 32, nombre: "Fiestas", descripcion: "Elementos de fiestas" },
]

app.get('/socios/v1/categorias', (req, res) => {
    //1. verificar si existe categorias
    if (categorias.length > 0) {
        //2. mostrarlas con un estado y mensaje
        res.status(200).json({
            estado: 1,
            mensaje: 'Categorias encontradas',
            categorias: categorias,
        })
    } else {
        //3. si no existe mostrar un estado y mensaje
        res.status(404).json({
            estado: 0,
            mensaje: 'No se encontraron categorias',
        })
    }
    //En formato JSON
    //mostrar mensaje de estado del servidor
    res.send('Mostrar todas las categorias');

});

app.get('/socios/v1/categorias/:id', (req, res) => {
    const id = req.params.id;
    const categoria = categorias.find(categoria => categoria.id == id);

    if (categoria) {
        res.status(200).json({
            estado: 1,
            mensaje: 'Categoria encontrada',
            categoria: categoria,
        })
    }
    else {
        res.status(404).json({
            estado: 0,
            mensaje: 'Categoria no encontrada',
            categoria: {}
        })
    }

    res.send('Mostrar una categoria por id')
});

app.post('/socios/v1/categorias', (req, res) => {

    const { nombre, descripcion } = req.body;
    //generar un nuevo id
    const id = categorias.length + 1;
    longInicial = categorias.length;
    //crear un nuevo objeto de categoria
    if (nombre == undefined || descripcion == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: 'La categoria no se pudo crear',
        })
    } else {
        const categoria = { id: id, nombre: nombre, descripcion: descripcion };
        categorias.push({ categoria });
        if (categorias.length > longInicial) {
            res.status(201).json({
                estado: 1,
                mensaje: 'Categoria creada',
                categoria: categoria,
            })
        } else {
            //error de servidor
            res.status(500).json({
                estado: 0,
                mensaje: 'La categoria no se pudo crear',
            })
        }
        return print(categoria);
    }
    /*     req.params
        req.body
        req.query */

    res.send('Crear una categoria');
});

app.put('/socios/v1/categorias/:id', (req, res) => {
    //res.send('Actualizar una categoria por su id');

    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if (nombre == undefined || descripcion == undefined) {
        res.status(400).json({
            estado: 0,
            mensaje: 'Faltan parametros en la solicitud',
        })
    } else {
        const posActualizar = categorias.findIndex(categoria => categoria.id == id);
        if (posActualizar) {
            categorias[posActualizar].nombre = nombre;
            categorias[posActualizar].descripcion = descripcion;
            res.status(200).json({
                estado: 1,
                mensaje: 'Categoria actualizada',
                categorias: categorias,
            })
        } else {
            res.status(404).json({
                estado: 0,
                mensaje: 'Categoria no encontrada',
                categorias: {}
            })
        }
    }

});

app.delete('/socios/v1/categorias/:id', (req, res) => {
    //res.send('Eliminar una categoria por su id');
    const { id } = req.params;
    const posEliminar = categorias.findIndex(categoria => categoria.id == id);
    if (posEliminar) {
        //borrar la categoria
        categorias.splice(posEliminar, 1);
        res.status(200).json({
            estado: 1,
            mensaje: 'Categoria eliminada',
            categorias: categorias,
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: 'Categoria no encontrada',
        })
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});