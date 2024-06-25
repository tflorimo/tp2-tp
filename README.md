💻 Trabajo Práctico

Este proyecto es parte de la práctica para el curso de Programación.
Descripción

Este repositorio contiene el código necesario para inicializar y trabajar con el proyecto.
Integrantes

    Tomas Florimo 😎
    Ruben Rafael 🌟
    Agustina Kramer 🌟
    Tomas Rossi 😎

🚀 Inicializar repositorio de git y descargar el código
bash

git init
git remote add https://github.com/tflorimo/tp2-tp.git
git checkout main
git pull origin main

📦 Hacer install de NPM del repositorio
bash

npm install

🌿 Hacer copia para tu branch
bash

git checkout -b tomasf/tomasr/agus/ruben

De esta manera, hacemos commits en un branch propio y al finalizar los merge se hacen contra MAIN (que no debe tocarse).

🛠️ Modelos

Todos los modelos deben tener: 
underscored: true (para seguir una convención de nombres de columnas)
timestamps: true (para que se creen columnas de createdAt y updatedAt)
paranoid: true (para que se haga soft-delete)

👤 User

    id - PRIMARY KEY
    first_name
    last_name
    email
    password
    role_id - FOREIGN KEY
    is_active

🔒 Role

    id - PRIMARY KEY
    name
    is_active
    admin

🛒 Product

    id - PRIMARY KEY
    name
    brand
    type_id - FOREIGN KEY
    supplier_id - FOREIGN KEY

🏢 Supplier

    id - PRIMARY KEY
    name
    address
    is_active

🏷️ Type

    id - PRIMARY KEY
    name

💰 Price

    id - PRIMARY KEY
    product_id - FOREIGN KEY
    price
    profit_percentage

📦 Stock

    id - PRIMARY KEY
    product_id - FOREIGN KEY
    inventory_qty # En mostrador
    stock_qty # En el depósito
    total_qty # Stock real (total)
    restock_qty # Límite en el que se debe solicitar restock

🙏 Agradecimientos

Gracias a nuestro profesor por su apoyo y guía durante el curso. ¡Ha sido una experiencia increíble!
