
ayelen
======

Sitio web de Ayelen

Para ejecutar en modo desarrollo se debe tener instalado Nodejs, Grunt y Bower


###Instalar node
[Manual instalacion](http://coolestguidesontheplanet.com/installing-node-js-osx-10-9-mavericks/ "Manual Instalacion")

####Instalar Grunt y Bower
> $ npm install -g grunt-cli bower

###Ejecutar modo desarrollo

Una vez instalada las dependencias generales, es necesario instalar las dependencias del propio proyecto, para esto ubicarse en la consola en el directorio raiz del proyecto y ejecutar:

> $ npm install
> $ bower install

Una vez realizada la instalación de dependencias del proyecto, ejecutar lo siguiente para ver el sitio en modo desarrollo

> $ grunt serve

Una vez finalizados los cambios, realizar commit y subir los cambios al repositorio

### Construir el proyecto para publicacion

Simplemente utilizar la consola con:

> $ grunt build

Con eso se actualiza el directorio dist, por lo que hay que guardar los cambios:

> $ git add -f dist/

y commit para que se pueda subir a heroku
