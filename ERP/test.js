"use strict";

//Testeo del storehouse
function testStoreHouse(){
    function testCoords(){
        console.log ("---- Testeo Objeto Coords ----");
        //Coordenadas c1: -150, 150
        console.log("Coordenadas c1: " + c1.latitude + ", " + c1.longitude);
        console.log("Coordenadas c1: " + c1.getSexagesimalLatitude());
        console.log("Coordenadas c1: " + c1.getSexagesimalLongitude());

        try {
            var c2 = new Coords(-20,94);
            console.log("Coordenadas c1: " + c1.latitude + ", " + c1.longitude);
        } catch(err) {
            //Error: InvalidValueException: Error: The paramenter latitude has an invalid value. (latitude: -190)
            console.log("Error: " + err.toString());
        }

        try {
            var c3 = new Coords(90,-90);
            console.log("Coordenadas c1: " + c1.latitude + ", " + c1.longitude);
        } catch(err) {
            //Error: InvalidValueException: Error: The paramenter longitude has an invalid value. (longitude: 190)
            console.log("Error: " + err.toString());
        }
        console.log ("---- Fin: Testeo Objeto Coords ----");
    }
    function testProduct(){
        console.log("---- Testeo Objeto Product ----")
                    console.log(ps1.toString());
                    console.log(pt1.toString());

        console.log ("---- Fin: Testeo Objeto Product ----");
    }
    function testShop(){
        console.log("---- Testeo Objeto Shop ----")
        console.log(shop1.toString());
        console.log(shop2.toString());
    }

    function testCategory(){
        console.log ("---- Testeo Category ----");
        //Categoría cat1: Category: Categoría 1(Descripción categoría 1)
        console.log ("Categoría cat1: " + cat1.toString());
        //Categoría cat2: Category: Categoría 2(Descripción categoría 2)
        console.log ("Categoría cat2: " + cat2.toString());
        //Categoría cat3: Category: Categoría 3(Descripción categoría 3)
        console.log ("Categoría cat3: " + cat3.toString());
        console.log ("---- Fin: Testeo Category ----");
    }

    function testStoreHouseWithCategory(){
        console.log ("---- Testeo StoreHouse: Categorías ----");
        //Probamos las categorías.
        //Añadimos la categoría: Categoría 1
        console.log("Añadimos la categoría: " + cat1.title);
        //Añadimos la categoría: Categoría 2
        console.log("Añadimos la categoría: " + cat2.title);
        try{
            store.addCategory(cat1);
            store.addCategory(cat2);
        } catch (err){
            //CategoryExistsStoreHouseException: Error: The category exists in the StoreHouse.
            console.log(err.toString());
        }

        console.log("Categoría por defecto: " + store.defaultCategory.title);
        try{
            store.removeCategory(store.defaultCategory);
        } catch (err){
            //DefaultCategoryStoreHouseException: Error: The deafult category can't be removed.
            console.log(err.toString());
        }

        console.log ("---- Fin: Testeo StoreHouse: Categorías ----");
        console.log("");
        console.log("");
    }
    function testStoreHouseWithShop(){
        console.log ("---- Testeo StoreHouse: Shops ----");
        //Probamos las categorías.
        //Añadimos la tienda: Shop 1
        console.log("Añadimos la tienda: " + shop1.name);
        //Añadimos la tienda: Shop 2
        console.log("Añadimos la tienda: " + shop2.name);
        try{
            store.addShop(shop1);
            store.addShop(shop2);
        } catch (err){
            //ShopExistsStoreHouseException: Error: The shop exists in the StoreHouse.
            console.log(err.toString());
        }

        console.log("Shop por defecto: " + store.defaultShop.name);
        try{
            store.removeShop(store.defaultShop);
        } catch (err){
            //DefaultShopStoreHouseException: Error: The deafult category can't be removed.
            console.log(err.toString());
        }

        console.log ("---- Fin: Testeo StoreHouse: Categorías ----");
        console.log("");
        console.log("");
    }
    function showCategories(){
        //Recorremos las categorías.
        console.log ("Recorremos las categorías.");
        var categories = store.categories;
        var category = categories.next();
        while (category.done !== true){
            //Category: title
            console.log ("Category: " + category.value.title);
            category = categories.next();
        }
    }

    function showShops(){
        //Recorremos las tiendas.
        console.log ("Recorremos las tiendas.");
        var shops = store.shops;
        var shop = shops.next();
        while (shop.done !== true){
            //Category: title
            console.log ("Shop: " + shop.value.name);
            shop = shops.next();
        }
    }

    function testStoreHouseWithProduct(){
        console.log ("---- Testeo StoreHouse: Productos ----");
        try{
            store.addProduct (pt1,cat1);
        } catch (err){
            //ProductExistsStoreHouseException: Error: The product exists in the category 'Categoría 1'.
            console.log(err.toString());
        }
        //Borrado
        try{
            store.removeProductCategory (new SmartPhone("001","Prueba",200),cat1);
        } catch (err){
            //ProductNotExistsStoreHouseException: Error: The product doesn't exist in the category 'Categoría 1'.
            console.log(err.toString());
        }
        try{
            store.removeProductCategory (pt1,new Category("Categoría 4"));
        } catch (err){
            //CategoryNotExistsStoreHouseException: Error: The category doesn't exist in the StoreHouse.
            console.log(err.toString());
        }

        //Borrado
        try{
            store.removeProduct (pt2);
        } catch (err){
            //ProductNotExistsStoreHouseException: Error: The product doesn't exist in the category ''.
            console.log(err.toString());
        }
        console.log ("---- Fin: Testeo StoreHouse: Productos ----");
        console.log("");
        console.log("");
    }
    function showAllProducts(){
        console.log ("---- Mostramos los productos de cada categoría ----");
        var categories = store.categories;
        var category = categories.next();
        while (category.done !== true){
            //Category: title
            console.log ("Category: " + category.value.title);
            showProducts(store.getCategoryProducts(category.value));
            category = categories.next();
        }
        console.log ("---- Fin: Mostramos los productos de cada categoría ----");
    }

    function showProducts(products){
        var product = products.next();
        while (product.done !== true){
            //Product
            console.log ("Product: " + product.value.serial_number);
            product = products.next();
        }
    }

    function showTVs(){
        console.log ("---- Products TV ----");
        showProducts(store.getTVs());
        console.log ("---- Fin: Productos TV ----");
    }

    function showSmartPhones(){
        console.log ("---- Products SmartPhones ----");
        showProducts(store.getSmartPhones());
        console.log ("---- Fin: Products SmartPhones ----");
    }

    function showConsoles(){
        console.log ("---- Products Consoles ----");
        showProducts(store.getConsoles());
        console.log ("---- Fin: Products Consoles ----");
    }


    var c1 = new Coords(-1,-23);
    var c2 = new Coords(4,-112);
    testCoords();

    var pt1 = new TV("002","TV1", 500);
    pt1.description = "Descripción del producto TV1";

    var ps1 = new SmartPhone("003","SmartPhone1", 300);
    ps1.description = "Descripción del producto SmartPhone1";

    var pt2 = new TV("004","TV2", 420);
    pt2.description = "Descripción del producto TV2";

    var pc1 = new Console("005", "Console1", 400);
    pc1.description = "Descripción del producto Console1";
    testProduct();

    var shop1 = new Shop("SHOP1");
    shop1.cif = "11111111A";
    shop1.dir = "Calle Falsa, 123";
    shop1.tfno = "911111111";
    shop1.coords = c1;

    var shop2 = new Shop("SHOP2");
    shop2.cif = "22222222B";
    shop2.dir = "Calle Tal, 321";
    shop2.tfno = "922222222";
    shop2.coords = c2;
    testShop();

    var cat1 = new Category("Categoría 1");
    cat1.description = "Descripción categoría 1";
    var cat2 = new Category("Categoría 2");
    cat2.description = "Descripción categoría 2";
    var cat3 = new Category("Categoría 3");
    cat3.description = "Descripción categoría 3";
    testCategory();

    console.log ("---- Testeo StoreHouse ----");
    var store = StoreHouse.getInstance();
    store.title = "StoreHouse de prueba";
    //Instancia StoreHouse: StoreHouse de prueba
    console.log ("Instancia StoreHouse: " + store.title);

    store.addCategory(cat1);
    store.addCategory(cat2);
    store.addCategory(cat3);
    store.removeCategory(cat3);
    showCategories();
    testStoreHouseWithCategory();

    store.addShop(shop1);
    store.addShop(shop2);
    showShops();
    testStoreHouseWithShop();

    console.log("Añadido: " + pt1.name + ". Nº de productos: " + store.addProduct (pt1,cat1));
    console.log("Añadido: " + ps1.name + ". Nº de productos: " + store.addProduct (ps1,cat2));
    console.log("Añadido: " + pt2.name + ". Nº de productos: " + store.addProduct (pt2,cat1));
    console.log("Añadido: " + pc1.name + ". Nº de productos: " + store.addProduct (pc1,cat3));


    showAllProducts();

    showTVs();
    showSmartPhones();
    showConsoles();
    console.log ("---- Fin: Testeo StoreHouse ----");
}
window.onload = testStoreHouse;


