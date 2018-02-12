"use strict";

//OBJETO COORDS
function Coords(latitude = 0, longitude = 0){
	//La función se invoca con el operador new
	if (!(this instanceof Coords)) 
		throw new InvalidAccessConstructorException();

	latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
	if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) 
		throw new InvalidValueException("latitude", latitude);
	longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
	if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180) 
		throw new InvalidValueException("longitude", longitude);

	var _latitude = latitude;
	var _longitude = longitude;

	Object.defineProperty(this, 'latitude', {
		get:function(){
			return _latitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -90 || value > 90) 
				throw new InvalidValueException("latitude", value);
			_latitude = value;
		}		
	});		

	Object.defineProperty(this, 'longitude', {
		get:function(){
			return _longitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -180 || value > 180) 
				throw new InvalidValueException("latitude", value);
			_longitude = value;
		}		
	});		

}
Coords.prototype = {};
Coords.prototype.constructor = Coords;

Coords.prototype.getSexagesimalLatitude = function (){	
	var direction = this.latitude >= 0 ? "N" : "S";
	var latitude = Math.abs(this.latitude);
	var grades =  Math.floor (latitude);
	var tmpMinutes = (latitude - grades) * 60;
	var minutes = Math.floor (tmpMinutes);
	var tmpSeconds = (tmpMinutes - minutes) * 60;
	var seconds = Math.round (tmpSeconds);

	return grades + "°" + minutes + "'" + seconds + "''" + direction; 
}

Coords.prototype.getSexagesimalLongitude = function (){	
	var direction = this.longitude >= 0 ? "E" : "W";
	var longitude = Math.abs(this.longitude);
	var grades =  Math.floor (longitude);
	var tmpMinutes = (longitude - grades) * 60;
	var minutes = Math.floor (tmpMinutes);
	var tmpSeconds = (tmpMinutes - minutes) * 60;
	var seconds = Math.round (tmpSeconds);

	return grades + "°" + minutes + "'" + seconds + "''" + direction; 
}
//FIN COORD

//OBJETO CATEGORIA
function Category(title = "Anon"){
	//La función se invoca con el operador new
	if (!(this instanceof Category)) 
		throw new InvalidAccessConstructorException();

	title = title.trim();
	if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");					

	var _title = title;	
	var _description = "";

	Object.defineProperty(this, 'title', {
		get:function(){
			return _title;
		},
		set:function(title = "Anonimous"){
			title = title.trim();
			if (title === 'undefined' || title === 'Anon') throw new EmptyValueException("title");					
			_title = title;
		}		
	});		
	
	Object.defineProperty(this, 'description', {
		get:function(){
			return _description;
		},
		set:function(value){
			if (value === 'undefined') throw new EmptyValueException("description");	
			_description = value;
		}		
	});				

}
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function (){	
	return "Category: " + this.title + " (" + this.description + ")"; 
}
//FIN CATEGORIA

//OBJETO PRODUCTO
function Product(serial_number, name, price){
	//La función se invoca con el operador new
	if (!(this instanceof Product)) 
		throw new InvalidAccessConstructorException();

	//Comprobación para que Image sea clase abstracta.
    if ((this.constructor === Product)) {
        throw new AbstractClassException("Product");
    }

	serial_number = serial_number.trim();
	name = name.trim();
    //
    
    //Comprobamos que no está vacío
	if (serial_number === 'undefined' || serial_number === '') throw new EmptyValueException("serial_number");

	if (name === 'undefined' || name === '') throw new EmptyValueException("name");
    
    if (price === 'undefined' || price === '') throw new EmptyValueException("price");
    //
		

	var _serial_number = serial_number;
	var _name = name;
	var _price = price;
    var _description = "";
    var _tax = 0;
    var _image = [];

	Object.defineProperty(this, 'serial_number', {
		get:function(){
			return _serial_number;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("serial_number");
			_serial_number = value;
		}		
	});		

	Object.defineProperty(this, 'name', {
		get:function(){
			return _name;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("name");	
			_name = value;		
		}		
	});			

	Object.defineProperty(this, 'price', {
		get:function(){
			return _price;
		},
		set:function(value){
			if (value === 'undefined' || value == null) throw new EmptyValueException("price");	
			_price = value;
		}		
	});				

	Object.defineProperty(this, 'description', {
		get:function(){
			return _description;
		},
		set:function(value){
			if (value === 'undefined') throw new EmptyValueException("description");	
			_description = value;
		}		
	});
    
    Object.defineProperty(this, 'tax', {
		get:function(){
			return _tax;
		},
		set:function(value){
			if (value === 'undefined' || value == null) throw new EmptyValueException("tax");	
			_tax = value;
		}		
	});
    
    Object.defineProperty(this, 'image', {
		get:function(){
			return _image;
		},
		set:function(value){
			if (value === 'undefined' || value == null) throw new EmptyValueException("image");	
			_image = value;
		}		
	});
}

Product.prototype = {};
Product.prototype.constructor = Product;

Product.prototype.toString = function (){	
	return this.constructor.name + ": " + "(" + this.serial_number + "). " + this.name + " " + this.description;
}
//FIN PRODUCTO

//HEREDADOS
function TV(serial_number, name, price){
	//Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
	Product.call(this,serial_number, name, price);	
}
TV.prototype = Object.create(Product.prototype);
TV.prototype.constructor = TV;

function SmartPhone(serial_number, name, price){
	//Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
	Product.call(this,serial_number, name, price);	
}
SmartPhone.prototype = Object.create(Product.prototype);
SmartPhone.prototype.constructor = SmartPhone;

function Console(serial_number, name, price){
	//Invocamos el constructor de la clase padre, en él se comprueba que utilizamos el operador new.
	Product.call(this,serial_number, name, price);	
}
Console.prototype = Object.create(Product.prototype);
Console.prototype.constructor = Console;
//FIN HEREDADOS

//OBJETO SHOP

function Shop(name = "Anon"){
    //La función se invoca con el operador new
    if (!(this instanceof Shop))
        throw new InvalidAccessConstructorException();

    name = name.trim();
    if (name === 'undefined' || name === 'Anon') throw new EmptyValueException("name");

    var _name = name;
    var _cif = "";
    var _dir = "";
    var _tfno = "";
    var _coords = null;

    Object.defineProperty(this, 'name', {
        get:function(){
            return _name;
        },
        set:function(name = "Anonimous"){
            name = name.trim();
            if (name === 'undefined' || name === '') throw new EmptyValueException("name");
            _name = name;
        }
    });

    Object.defineProperty(this, 'cif', {
        get:function(){
            return _cif;
        },
        set:function(value){
            if (value === 'undefined') throw new EmptyValueException("cif");
            _cif = value;
        }
    });

    Object.defineProperty(this, 'dir', {
        get:function(){
            return _dir;
        },
        set:function(value){
            if (value === 'undefined') throw new EmptyValueException("dir");
            _dir = value;
        }
    });

    Object.defineProperty(this, 'tfno', {
        get:function(){
            return _tfno;
        },
        set:function(value){
            if (value === 'undefined') throw new EmptyValueException("tfno");
            _tfno = value;
        }
    });

    Object.defineProperty(this, 'coords', {
        get:function(){
            return _coords;
        },
        set:function(value){
            if (value === 'undefined' || value == null) throw new EmptyValueException("coords");
            if (!value instanceof Coords) throw new InvalidValueException("coords", value);
            _coords = value;
        }
    });

}
/*function Shop(name = "Anon"){
	//La función se invoca con el operador new
	if (!(this instanceof Shop)) 
		throw new InvalidAccessConstructorException();
    
	name = name.trim();
    
    if (name === 'undefined' || name === 'Anon') throw new EmptyValueException("name");
    
    var _cif = "";
    var _name = name;
    var _dir = "";
    var _tfno = "";
    var _coords = null;

    Object.defineProperty(this, 'cif', {
        get:function(){
            return _cif;
        },
        set:function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("cif");
            _cif = value;
        }
    });

    Object.defineProperty(this, 'name', {
        get:function(){
            return _name;
        },
        set:function(value){
            if (value === 'undefined' || value === 'Anon') throw new EmptyValueException("name");
            _name = value;
        }
    });

    Object.defineProperty(this, 'dir', {
        get:function(){
            return _dir;
        },
        set:function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("dir");
            _dir = value;
        }
    });

    Object.defineProperty(this, 'tfno', {
        get:function(){
            return _tfno;
        },
        set:function(value){
            if (value === 'undefined' || value === '') throw new EmptyValueException("tfno");
            _tfno = value;
        }
    });

    Object.defineProperty(this, 'coords', {
        get:function(){
            return _coords;
        },
        set:function(value){
            if (value === 'undefined' || value == null) throw new EmptyValueException("coords");
            if (!value instanceof Coords) throw new InvalidValueException("coords", value);
            _coords = value;
        }
    });

}*/
Shop.prototype = {};
Shop.prototype.constructor = Shop;
Shop.prototype.toString = function (){
    return this.constructor.name + ": ("+ this.cif +") " + this.name + " " + this.dir;
}


//FIN SHOP