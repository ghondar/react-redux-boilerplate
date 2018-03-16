# react-redux-boilerplate

### How to install

```
    npm install or yarn install
```

##### Run developer
```
    npm run dev
```
##### Run build
```
    npm run build
    npm run start
```

## Reglas de estilo:

### 1. Siempre al comenzar un extends de un component no se usara espacio para la primera function

#### Invalido

```diff
      export default class Componente extends Component {

        constructor(props, context) {
          super(props, context)
        }
        ...
```

#### Valido

```diff
        export default class Componente extends Component {
-                                                          
          constructor(props, context) {
            super(props, context)
          }
          ...
```

### 2. En una condicional si lo que contiene es solo una linea, no usaremos '{}'

#### Invalido

```diff
    if(a > 1) {
      funcion()
      var b = algo
    } else {
      otraFuncion()
    }
```

#### Valido

```diff
    if(a > 1) {
      funcion()
      var b = algo
-   } else
      otraFuncion()
-                  
```

### 3. No se usaran ';'

### 4. Solo se usaran "" en el caso que sea necesario

#### Ejemplo

```sh
    var a = 'ejemplo "algo"'
```

### 5. Cuando se tiene un arrow function con un solo parametro, omitir el uso de '()'

#### Invalido

```diff
    var a = (b) => {
      ...
    }
```

#### Valido

```diff
-   var a = b => {
      ...
    }
```

### 6. Si se quiere devolver un solo dato en un arrow function, omitir el return y las '{}'

#### Invalido

```diff
    var a = b => {
      return 'algo'
    }
```

#### Valido

```diff
-   var a = b => 'algo'
```

### 7. Usar condicional ternaria en el caso de que sea una linea de codigo ejecutada

#### Invalido

```diff
    if(a) {
      b
    } else {
      c
    }
```

#### Valido

```diff
+   a ? b : c
```

### 8. Usar '()' en un return de un compenten que tenga mas de una linea

#### Invalido

```diff
    render() {
      return <PrimerComponente>
              <OtroComponente>
            <PrimerComponente />
    }
```

#### Valido

```diff
    render() {
+     return (
        <PrimerComponente>
          <OtroComponente>
        <PrimerComponente />
+     )
    }
```

### 9. Dejar espacios al comienzo y al final de un objeto para mejor claridad a la
hora de leerlo

#### Invalido

```diff
    var a = {b: 'c'}
```

#### Valido

```diff
+   var a = { b: 'c' }
```

### 10. Dejar un espacio siempre antes de un return

#### Invalido

```diff
    function() {
      var a = 'b'
      return 'c'
    }
```

#### Valido

```diff
    function() {
      var a = 'b'
+                
      return 'c'
    }
```

### 1. No dejar mas de una linea vacia

#### Invalido

```diff
    function() {
      var a = 'b'


      return 'c'
    }
```

#### Valido

```diff
    function() {
      var a = 'b'
-                
      return 'c'
    }
```

# Estandar en Redux:

### 1. Para nombrar los reducers usar la terminacion 'algoStore.js'

# Estandar en Javascript:

### 1. Tratar de usar ES6 7 y 8 en la mayor medida posible a menos que sea sumamente
necesario como en caso de hacer una codicional como en el ejemplo de abajo, solo
en esos casos usar ES5

```sh
const b = a ? require('b') : require('c')
```

### 2. Usar el termino '\_handlerAlgo' si la funcion interactua con el usuario

#### Invalido

```diff
    import React, { PropTypes, Component } from 'react'

    export default class Class extends Component{
      constructor(props, context) {
        super(props, context)
      }

      render() {
        return (
          <Button
            onPress={this.login.bind(this)}/>
        )
      }

      login() {
        ingresar()
      }
    }
```

#### Valido

```diff
    import React, { PropTypes, Component } from 'react'

    export default class Class extends Component{
      constructor(props, context) {
        super(props, context)
      }

      ingresar() {
        var a = 'b'
        ...
      }

      render() {
        return (
          <Button
-           onPress={this._handlerLogin.bind(this)}/>
        )
      }

-     _handlerLogin() {
        ingresar()
      }
    }
```

### 3. las funciones que interactuaran con el usuario iran despues del render

#### Invalido

```diff
    import React, { PropTypes, Component } from 'react'

    export default class Class extends Component{
      constructor(props, context) {
        super(props, context)
      }

      ingresar() {
        var a = 'b'
        ...
      }

      _handlerLogin() {
        ingresar()
      }

      render() {
        return (
          <Button
            onPress={this._handlerLogin.bind(this)}/>
        )
      }
    }
```

#### Valido

```diff
    import React, { PropTypes, Component } from 'react'

    export default class Class extends Component{
      constructor(props, context) {
        super(props, context)
      }

      ingresar() {
        var a = 'b'
        ...
      }
-               
      render() {
        return (
          <Button
           onPress={this._handlerLogin.bind(this)}/>
        )
      }

+     _handlerLogin() {
        ingresar()
      }
    }
```

### 4. Separar las los imports de librerias de terceros, de los componentes o alguna libreria propia

#### Invalido

```js
    import React, { PropTypes, Component } from 'react'
    import LibreriaTerceros from 'libreria-terceros'
    import Componente from './componente'
    import NuestraLibreria from './lib/nuestraLibreria'
```

#### Valido

```js
    import React, { PropTypes, Component } from 'react'
    import LibreriaTerceros from 'libreria-terceros'
    ...

    //Custom Libraries
    import NuestraLibreria from './lib/nuestraLibreria'
    ...

    //Custom Components
    import Componente from './componente'
    ...

    // Material Style Compoents
    import AppBar from 'material-ui/AppBar'
    ...

    // Material SVG Icons
    import Home from 'material-ui/svg-icons/action/home'
    ...

    // Global Material Store
    import muiThemeable from 'material-ui/styles/muiThemeable'
    ...
```
