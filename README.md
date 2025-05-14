# jRequests (jR)
Requests es una biblioteca JavaScript que simplifica las solicitudes AJAX y la manipulación del DOM en tu sitio web. Te permite realizar peticiones a servidores web, actualizar contenido en tiempo real y mucho más.

## Demo

url: [https://jrequests.ronaldbit.com/](https://jrequests.ronaldbit.com/pruebas.php) 

## Install

Para obtener instrucciones de instalación, consulte nuestros documentos en [https://ronaldbit.com/project/jrequests ](https://ronaldbit.com/projects/p-jrequests)

## Configuration

Nosotros amablemente proporcionamos soporte CDN para JavaScript. Simplemente use estos enlaces.
Copie y pege en el apartado en el Head.
```
<link rel="stylesheet" href="https://jrequests.ronaldbit.com/jrequests-4.5.6.min.js"> 
```

o puede descargar el js directamente aqui en Git.

## Cómo Usar jRequests

### Comience con esta plantilla HTML básica o modifique estos ejemplos . Esperamos que personalice nuestras plantillas y ejemplos, adaptándolos a sus necesidades.

Copie el HTML a continuación para comenzar a trabajar con un documento Bootstrap mínimo.

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Codint Example</title>
    //integrando jrequests
    <link rel="stylesheet" href="https://jrequests.ronaldbit.com/jrequests-4.5.6.min.js"> 
  </head>
  <body>
    <button id="addElements">Añadir elementos</button>
    <div id="contendor"></div>
    <hr>
    <button id="button" class="btn">Realizar solicitud</button>
    <input type="text" value="texto" id="inputTexto" data-texto="texto" />
    <div id="prinText"></div>
    <button id="buttonChange" >Change atributo de input</button>
    <script>
    //Estilos por class
    R('.btn').css('background','yellow'); 

    //Estilos => color : black
    R('#button').css('color','black');
    
    //Estilos => border 
    R('#button').css('border','1px solid #9f9f9f');
    
    //Estilos multiples => padding - borderRadius 
    R('#button').css({padding: '15px', borderRadius: '5px'});
    
    //Eventos => onClick
    R('#button').un('click', () => {
        //Consulta
        r.consulta({
          url: 'post.php',
          datos: { valor : 'Hola, ', texto : 'esta es una respuesta'},
          type: 'POST',
          dataType: 'json',
          respuesta: function(json) { 
            R('#prinText').texto('Mensaje:: '+ json.title);
          },
          error: function(xhr, status) { 
            R('#prinText').texto('Disculpe, existió un problema :: '+status);
          }
        });
    });
    
    R('#inputTexto').un('keydown', () => {
        //obtener el valor del id selecionado
        var valueInput = R("#inputTexto").valor(); 
        var valueAtrr = R("#inputTexto").atributo('data-texto'); 
    
        //insertar texto
        R('#prinText').html(valueAtrr + ' :: ' + valueInput);
    });
    
    //boton para cambiar el valor de un atributo
    R('#buttonChange').un('click', () => {
        var valor = R("#inputTexto").valor(); 
        R("#inputTexto").cambiarAtributo('data-texto', valor); 
    });
    
    var e = 0;
    //boton para añadir elemntos
    R('#addElements').un('click', () => {
        const newDiv = document.createElement('div');
        newDiv.classList.add("class_"+e, "op"); 
        newDiv.textContent = 'Nuevo elemento: '+e;
        
        R('#contendor').adjuntar(newDiv);
        e++;
    });
    
    </script>

  </body>
</html>
```


## Content

Una vez descargado, descomprima la carpeta comprimida para ver la estructura. Verás algo como esto:

```
jrequests/
└─── jrequests-4.5.6.min.js
```

¡Esperamos que disfrutes utilizando jRequests en tu desarrollo web!

<hr>
<p align="center"> © 2023 Ronald Ramos. </p>
