# E-Commerce App - React Native

Una aplicación de comercio electrónico para venta de ropa de niños, desarrollada con React Native que ofrece una experiencia de compra completa y fácil de usar.

## Funcionalidades Principales
 Catálogo de Productos
 Exploración de ropa por categorías
 Búsqueda con filtro 
 Guía de talles interactiva con medidas exactas.
 selección de color
 Perfil con imagen personalizada y localización.
 Login, Sign up, Logout
 Navbar, Tabbar
 Seguimiento de pedidos en tiempo real.

### Pantalla de Cuenta

- **Login:** Solo los usuarios autenticados pueden acceder a la pantalla de perfil y realizar compras.
             La app mantiene el login del cliente si este sale y vuelve a ingresar a la cuenta.
- **Registro:** Nuevos clientes pueden ingresar a la app, mediante mail y contraseña.
- **Información del usuario:** Muestra detalles del usuario, como nombre y dirección.

<img src="./screenshot/IMG de la app-01.jpg" width="300" >
<img src="./screenshot/IMG de la app-02.jpg" width="300" >

### Autenticación con Firebase

- Utiliza el sistema de autenticación de Firebase para gestionar el acceso de usuarios.
- Permite a los usuarios iniciar sesión y registrarse de manera segura.

### Pantalla de Categorías

- Muestra una selección de categorías en tarjetas.
- Al hacer clic en una categoría, se navega a la pantalla de productos correspondiente.

### Pantalla de Productos

- Lista todos los productos en tarjetas con nombre y foto.
- Incluye un buscador para filtrar productos por nombre.
- Al hacer clic en un producto, se navega a la pantalla de detalles del producto.

### Pantalla de Detalles del Producto

- Slider de productos
- Proporciona una descripción detallada del producto.
- Permite selección de tamaño del producto
- Permite selección de color del producto
- Permite selección de cantidad de producto
- Muestra el precio y la valoracion.
- Permite agregar el producto al carrito.

<img src="./screenshot/Imagenes de la app2-01.jpg" width="300" >
<img src="./screenshot/Imagenes de la app2-02.jpg" width="300" >


### Navegación Inferior

```javascript
       
const TapNavigator = () => {

  return (
       <Tab.Navigator
        screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarStyle : styles.tabBar,
            tabBarLabelPosition:"beside-icon"
        }}
       >
            <Tab.Screen 
                name='ShopStack' 
                component={ShopStack}
                options={{
                    tabBarIcon:({focused}) => <TabBarIcon text="Tienda" icon="shop" focused={focused}/>
                }}
            />
            <Tab.Screen 
                name='CartStack' 
                component={CartStack}
                options={{ 
                    tabBarIcon:({focused}) => <TabBarIcon text="Carrito" icon="shopping-cart" focused={focused}/>
                }}
            />
            <Tab.Screen 
                name='OrdersStack' 
                component={OrdersStack}
                options={{ 
                    tabBarIcon:({focused}) => <TabBarIcon text="Ordenes" icon="list" focused={focused}/>
                }}
            />
               <Tab.Screen 
                name='MyProfileStack' 
                component={MyProfileStack}
                options={{ 
                    tabBarIcon:({focused}) => <TabBarIcon text="Perfil" icon="user" focused={focused}/>
                }}
            />
       </Tab.Navigator>
  )
}

```

- **Pestaña 1 - Productos:** Categorías y productos (stack principal).
- **Pestaña 2 - Carrito:** Detalles del carrito de compras con resumen y botón para finalizar la orden.
- **Pestaña 3 - Órdenes:** Historial de órdenes realizadas.
- **Pestaña 4 - Perfil:** Información del usuario, ubicación y carga de imagen de perfil.

<img src="./screenshot/Imagenes de la app3-01.jpg" width="300" >
<img src="./screenshot/Imagenes de la app3-02.jpg" width="300" >
<img src="./screenshot/Imagenes de la app3-03.jpg" width="300" >
<img src="./screenshot/Imagenes de la app3-04.jpg" width="300" >
<img src="./screenshot/Imagenes de la app3-05.jpg" width="300" >

## Tecnologías Utilizadas

- **Firebase Authentication:** Implementa el sistema de autenticación de Firebase para gestionar la seguridad de la aplicación.
- **React Native Navigation Stack:** Gestiona la navegación entre pantallas.
- **React Native Navigation Buttom tap:** Gestiona la navegación entre pestañas.
- **Expo-Location:** Permite acceder y gestionar la ubicación del usuario. (aclaro que utilice la API brindada por el profesor, ya que no poseo tarjeta de credito para generar la google api, pero entendi el proceso)
- **Expo-Picker-Image:** Facilita la carga de imágenes de perfil.
- **Redux:** Centraliza y gestiona el estado de la aplicación.
- **RTK Query y Firebase:** Realiza operaciones de lectura/escritura en la base de datos.

## Instalación

1. Clona el repositorio: `git clone https://github.com/ChristianKase/Little-Trendz-app`
2. Instala las dependencias: `npm install`
3. Configura las claves de API para servicios externos (Expo-Location, Firebase, etc.).
4. Configura las credenciales de Firebase en tu proyecto.
5. Ejecuta la aplicación: `npm start`

## Contacto

Para preguntas o soporte, contacta a christian.rkase@gmail.com
