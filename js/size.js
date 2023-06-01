/* 
Objetivo:
Adapta la altura del elemento main que se encuentra en la mitad de otros dos, el header y el footer, cada uno con 56px de altura.

Funcionamiento:
Se calcula la altura del viewport y se le resta el tamaño del header y el footer, asigna esta altura al main. El evento se ejecuta
cada vez que el tamaño del viewport se modifica.
*/

function changeSize() {
    var main = document.getElementById('main');
    main.style.height = window.innerHeight - 56*2 + 'px'
};

changeSize()

window.addEventListener('resize', changeSize);