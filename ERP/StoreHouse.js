"use strict";
// ERRORES
function StoreHouseException() {
    this.name = "StoreHouseException";
    this.message = "Error: StoreHouse Generic Exception.";
}
StoreHouseException.prototype = new BaseException();
StoreHouseException.prototype.constructor = StoreHouseException;

function CategoryStoreHouseException() {
    this.name = "CategoryStoreHouseException";
    this.message = "Error: The method needs a Category parameter.";
}
CategoryStoreHouseException.prototype = new StoreHouseException();
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;

function CategoryExistsStoreHouseException() {
    this.name = "CategoryExistsStoreHouseException";
    this.message = "Error: The category exists in the StoreHouse.";
}
CategoryExistsStoreHouseException.prototype = new StoreHouseException();
CategoryExistsStoreHouseException.prototype.constructor = CategoryExistsStoreHouseException;

function CategoryNotExistsStoreHouseException() {
    this.name = "CategoryNotExistsStoreHouseException";
    this.message = "Error: The category doesn't exist in the StoreHouse.";
}
CategoryNotExistsStoreHouseException.prototype = new StoreHouseException();
CategoryNotExistsStoreHouseException.prototype.constructor = CategoryNotExistsStoreHouseException;

function DefaultCategoryStoreHouseException() {
    this.name = "DefaultCategoryStoreHouseException";
    this.message = "Error: The deafult category can't be removed.";
}
DefaultCategoryStoreHouseException.prototype = new StoreHouseException();
DefaultCategoryStoreHouseException.prototype.constructor = DefaultCategoryStoreHouseException;

function ProductStoreHouseException() {
    this.name = "ProductStoreHouseException";
    this.message = "Error: The method needs a Product parameter.";
}
ProductStoreHouseException.prototype = new StoreHouseException(); //Heredamos de StoreHouseException
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;

function ProductExistsStoreHouseException(category) {
    this.name = "ProductExistsStoreHouseException";
    this.message = "Error: The product exists in the category '" + category.title + "'.";
}
ProductExistsStoreHouseException.prototype = new StoreHouseException(); //Heredamos de ImageManagerException
ProductExistsStoreHouseException.prototype.constructor = ProductExistsStoreHouseException;

function ProductNotExistsStoreHouseException(category) {
    var cat = (!category) ? '' : category.title;
    this.name = "ProductNotExistsStoreHouseException";
    this.message = "Error: The product doesn't exist in the category '" + cat + "'.";
}
ProductNotExistsStoreHouseException.prototype = new StoreHouseException(); //Heredamos de ImageManagerException
ProductNotExistsStoreHouseException.prototype.constructor = ProductNotExistsStoreHouseException;

function ShopStoreHouseException() {
    this.name = "ShopStoreHouseException";
    this.message = "Error: The method needs a Shop parameter.";
}
ShopStoreHouseException.prototype = new StoreHouseException();
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

function ShopExistsStoreHouseException() {
    this.name = "ShopExistsStoreHouseException";
    this.message = "Error: The shop exists in the StoreHouse.";
}
ShopExistsStoreHouseException.prototype = new StoreHouseException();
ShopExistsStoreHouseException.prototype.constructor = ShopExistsStoreHouseException;

function ShopNotExistsStoreHouseException() {
    this.name = "ShopNotExistsStoreHouseException";
    this.message = "Error: The shop doesn't exist in the StoreHouse.";
}
ShopNotExistsStoreHouseException.prototype = new StoreHouseException();
ShopNotExistsStoreHouseException.prototype.constructor = ShopNotExistsStoreHouseException;

function DefaultShopStoreHouseException() {
    this.name = "DefaultShopStoreHouseException";
    this.message = "Error: The deafult shop can't be removed.";
}
DefaultShopStoreHouseException.prototype = new StoreHouseException();
DefaultShopStoreHouseException.prototype.constructor = DefaultShopStoreHouseException;


//FIN ERRORES

//OBJETO STOREHOUSE
var StoreHouse = (function () {
    var instantiated; //Objeto con la instancia única StoreHouse

    function init() { //Inicialización del Singleton

        //CONSTRUCTOR
        function StoreHouse(){
            if (!(this instanceof StoreHouse))
                throw new InvalidAccessConstructorException();

            var _title = "Anonimous";
            Object.defineProperty(this, 'title', {
                get: function () {
                    return _title;
                },
                set: function (title = "Anonimous"){
                    title = title.trim();
                    if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");
                    _title = title;
                }
            });

            var _categories = []; //array de categorías.
            var _shops = []; //array de tiendas.

            //Devuelve un iterator de las categorias del gestor
            Object.defineProperty(this, 'categories', {
                get:function(){
                    var nextIndex = 0;
                    return {
                        next: function(){
                            return nextIndex < _categories.length ?
                                {value: _categories[nextIndex++].category, done: false} :
                                {done: true};
                        }
                    }
                }
            });

            Object.defineProperty(this, 'shops', {
                get:function(){
                    var nextIndex = 0;
                    return {
                        next: function(){
                            return nextIndex < _shops.length ?
                                {value: _shops[nextIndex++].shop, done: false} :
                                {done: true};
                        }
                    }
                }
            });

            //CATEGORIAS
            this.addCategory = function(category){
                if (!(category instanceof Category)) {
                    throw new CategoryStoreHouseException();
                }
                var position = getCategoryPosition(category);
                if (position === -1){
                    _categories.push(
                        {
                            category: category,
                            products:[]
                        }
                    );
                } else{
                    throw new CategoryExistsStoreHouseException();
                }

                return _categories.length;
            }

            //Elimina una categoría del gestor
            this.removeCategory = function(category){
                if (!(category instanceof Category)) {
                    throw new CategoryStoreHouseException();
                }
                var position = getCategoryPosition(category);
                if (position !== -1){
                    if (category.title !== _defaultCategory.title){
                        _categories.splice(position, 1);
                    } else{
                        throw new DefaultCategoryStoreHouseException();
                    }
                } else{
                    throw new CategoryNotExistsStoreHouseException();
                }
                return _categories.length;
            }

            function getCategoryPosition(category){
                if (!(category instanceof Category)) {
                    throw new CategoryStoreHouseException();
                }

                function compareElements(element) {
                    return (element.category.title === category.title)
                }

                return _categories.findIndex(compareElements);
            }

            //Categoría por defecto.
            var _defaultCategory = new Category ("Anonymous category"); //Categoría por defecto
            this.addCategory(_defaultCategory);


            Object.defineProperty(this, 'defaultCategory', {
                get:function(){
                    return _defaultCategory;
                }
            });

            //FIN CATEGORIAS

            //PRODUCTOS
            //Añadir producto
            this.addProduct = function(product, category){
                if (!(product instanceof Product)) {
                    throw new ProductStoreHouseException();
                }
                if (category === null || category === 'undefined' || category === ''){
                    category = this.defaultCategory;
                }
                if (!(category instanceof Category)) {
                    throw new CategoryStoreHouseException();
                }
                //Obtenemos posición de la categoría. Si no existe se añade.
                var categoryPosition = getCategoryPosition(category);
                if (categoryPosition === -1){
                    categoryPosition = this.addCategory(category)-1;
                }
                //Obtenemos posición del producto en la categoría. Si no existe se añade. Si existe se lanza excepción.
                var productPosition = getProductPosition(product, _categories[categoryPosition].products);
                if (productPosition === -1){
                    _categories[categoryPosition].products.push(
                        {
                            product: product
                        }
                    );
                } else{
                    throw new ProductExistsStoreHouseException(category);
                }

                return _categories[categoryPosition].products.length;
            }

            //Añadir productos a una tienda con un número de unidades
            this.addProductInShop = function(product, shop, units){
                if (!(product instanceof Product)) {
                    throw new ProductStoreHouseException();
                }
                if (shop === null || shop === 'undefined' || shop === ''){
                    shop = this.defaultShop;
                }
                if (!(shop instanceof Shop)) {
                    throw new ShopStoreHouseException();
                }
                //Obtenemos posición de la shop. Si no existe se añade.
                var shopPosition = getShopPosition(shop);
                if (shopPosition === -1){
                    shopPosition = this.addShop(shop)-1;
                }
                //Obtenemos posición del producto en la shop. Si no existe se añade. Si existe se lanza excepción.
                var productPosition = getProductPosition(product, _shops[shopPosition].products);
                if (productPosition === -1){
                    _shops[shopPosition].products.push(
                        {
                            product: product,
                            units: units
                        }
                    );
                } else{
                    throw new ProductExistsStoreHouseException(shop);
                }

                return _shops[shopPosition].products.length;
            }

            //Dado un producto, devuelve su posición en la categoría
            function getProductPosition(product, categoryProduct){
                if (!(product instanceof Product)) {
                    throw new ProductStoreHouseException();
                }

                function compareElements(element) {
                    return (element.product.serial_number === product.serial_number)
                }

                return categoryProduct.findIndex(compareElements);
            }

            //Elimina un producto de una categoría del gestor
            this.removeProductCategory = function(product, category){
                if (!(product instanceof Product)) {
                    throw new ProductStoreHouseException();
                }
                if (!(category instanceof Category)) {
                    throw new CategoryProductManagerException();
                }

                var categoryPosition = getCategoryPosition(category);
                if (categoryPosition !== -1){
                    var productPosition = getProductPosition(product, _categories[categoryPosition].products);
                    if (productPosition !== -1){
                        _categories[categoryPosition].products.splice(productPosition, 1);
                    } else{
                        throw new ProductNotExistsStoreHouseException(category);
                    }
                } else{
                    throw new CategoryNotExistsStoreHouseException();
                }
                return _categories[categoryPosition].products.length;
            }

            //Elimina un producto del gestor
            this.removeProduct = function(product){
                if (!(product instanceof Product)) {
                    throw new ProductStoreHouseException();
                }

                var i = _categories.length - 1, position = -1;
                while (i >= 0 && position === -1){
                    position = getProductPosition(product, _categories[i].products);
                    i--;
                }

                if (position !== -1){
                    _categories[i+1].products.splice(position, 1);
                } else {
                    throw new ProductNotExistsStoreHouseException();
                }
            }

            //Devuelve todos los productos de una determinada categoría
            this.getCategoryProducts = function(category){
                if (!(category instanceof Category)) {
                    throw new CategoryStoreHouseException();
                }

                var categoryPosition = getCategoryPosition(category);
                if (categoryPosition === -1) throw new CategoryNotExistsStoreHouseException();
                var nextIndex = 0;
                return {
                    next: function(){
                        return nextIndex < _categories[categoryPosition].products.length ?
                            {value: _categories[categoryPosition].products[nextIndex++].product, done: false} :
                            {done: true};
                    }
                }
            }
            //FIN PRODUCTOS

            //SHOP
            this.addShop = function(shop){
                if (!(shop instanceof Shop)) {
                    throw new ShopStoreHouseException();
                }
                var position = getShopPosition(shop);
                if (position === -1){
                    _shops.push(
                        {
                            shop: shop,
                            products:[]
                        }
                    );
                } else{
                    throw new ShopExistsStoreHouseException();
                }

                return _shops.length;
            }

            this.removeShop = function(shop){
                if (!(shop instanceof Shop)) {
                    throw new ShopStoreHouseException();
                }
                var position = getShopPosition(shop);
                if (position !== -1){
                    if (shop.name !== _defaultShop.name){
                        _shops.splice(position, 1);
                    } else{
                        throw new DefaultShopStoreHouseException();
                    }
                } else{
                    throw new ShopNotExistsStoreHouseException();
                }
                return _shops.length;
            }

            function getShopPosition(shop){
                if (!(shop instanceof Shop)) {
                    throw new ShopStoreHouseException();
                }

                function compareElements(element) {
                    return (element.shop.name === shop.name)
                }

                return _shops.findIndex(compareElements);
            }

            //Shop por defecto.
            var _defaultShop = new Shop ("Default Shop"); //Shop por defecto
            this.addShop(_defaultShop);


            Object.defineProperty(this, 'defaultShop', {
                get:function(){
                    return _defaultShop;
                }
            });

            //Devuelve todos los productos de una determinada shop
            this.getShopProducts = function(shop){
                if (!(shop instanceof Shop)) {
                    throw new ShopStoreHouseException();
                }

                var shopPosition = getShopPosition(shop);
                if (shopPosition === -1) throw new ShopNotExistsStoreHouseException();
                var nextIndex = 0;
                return {
                    next: function(){
                        return nextIndex < _shops[shopPosition].products.length ?
                            {value: _shop[shopPosition].products[nextIndex++].product, done: false} :
                            {done: true};
                    }
                }
            }
            //FIN SHOP

            //GETTERS
            this.getTVs = function(){
                var categoryPosition = 0;
                var productPosition = 0;
                return {
                    next: function(){
                        var product = null;
                        while (categoryPosition < _categories.length && product === null){
                            if (productPosition < _categories[categoryPosition].products.length &&
                                _categories[categoryPosition].products[productPosition].product instanceof TV){
                                product = _categories[categoryPosition].products[productPosition].product;
                            }
                            productPosition++;
                            if (productPosition >= _categories[categoryPosition].products.length){
                                productPosition = 0;
                                categoryPosition++;
                            }
                        }
                        if (product !== null){
                            return {value: product, done: false}
                        }
                        if (categoryPosition >= _categories.length) return {done: true};
                    }
                }
            }
            this.getSmartPhones = function(){
                var categoryPosition = 0;
                var productPosition = 0;
                return {
                    next: function(){
                        var product = null;
                        while (categoryPosition < _categories.length && product === null){
                            if (productPosition < _categories[categoryPosition].products.length &&
                                _categories[categoryPosition].products[productPosition].product instanceof SmartPhone){
                                product = _categories[categoryPosition].products[productPosition].product;
                            }
                            productPosition++;
                            if (productPosition >= _categories[categoryPosition].products.length){
                                productPosition = 0;
                                categoryPosition++;
                            }
                        }
                        if (product !== null){
                            return {value: product, done: false}
                        }
                        if (categoryPosition >= _categories.length) return {done: true};
                    }
                }
            }
            this.getConsoles = function(){
                var categoryPosition = 0;
                var productPosition = 0;
                return {
                    next: function(){
                        var product = null;
                        while (categoryPosition < _categories.length && product === null){
                            if (productPosition < _categories[categoryPosition].products.length &&
                                _categories[categoryPosition].products[productPosition].product instanceof Console){
                                product = _categories[categoryPosition].products[productPosition].product;
                            }
                            productPosition++;
                            if (productPosition >= _categories[categoryPosition].products.length){
                                productPosition = 0;
                                categoryPosition++;
                            }
                        }
                        if (product !== null){
                            return {value: product, done: false}
                        }
                        if (categoryPosition >= _categories.length) return {done: true};
                    }
                }
            }

            //FIN GETTERS
        }
        //FIN CONSTRUCTOR

        StoreHouse.prototype = {};
        StoreHouse.prototype.constructor = StoreHouse;

        var instance = new StoreHouse();//Devolvemos el objeto StoreHouse para que sea una instancia única.
        Object.freeze(instance);
        return instance;
    } //Fin inicialización del Singleton
    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function () {
            if (!instantiated) { //Si la variable instantiated es undefined, primera ejecución, ejecuta init.
                instantiated = init(); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };

})();
//FIN OBJETO STOREHOUSE