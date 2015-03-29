# Introduction #
**oopsjs** is the tiny library to add the classical object oriented features to standard JavaScript like data encapsulation, inheritance, interfaces, final, abstract etc. The advantage you get with **oopsjs** is **private instance variables** inheritance, **private instant methods** inheritance, interfaces and ability to implement **interfaces** and more with simple and clear syntax.

### Before you proceed ###

**"The**_super_**idea is fairly important in the classical pattern, but it appears to be unnecessary in the prototypal and functional patterns. I now see my early attempts to support the classical model in JavaScript as a mistake."** - _Douglas Crockford_. http://www.crockford.com/javascript/inheritance.html.

I personally feel that JavaScript and its prototype nature has great power and it should be leveraged the way it is available than mimicking Java like classical nature.

### Features ###
  * **inheritance**
  * **private instance variable & methods** inheritance - actually **protected** - private in a class and child classes
  * **interfaces** enforcing
  * ability to define **abstract and final** methods
  * **final classes**

# Getting started #
  * [Learn it](#FAQ's_cum_Tutorial_-_Learn_It.md)
> > [Class](#Q._How_to_define_a_class?.md) | [Private](#Q._Ok,_so_can_I_define_private_methods_also?_How?.md) | [Inheritance](#Q._How_to_inherit_a_class_and_define_subclass_of_it?.md) | [\_super](#Q._What_is__super_?.md) | [overriding](#Q._Can_child_class_override_the_parent_methods?.md) | [final](#Q._Can_I_make_parent_class_non_inheritable_(kind_of_final_in_Jav.md) | [abstract](#Q._Reverse_of_Final,_can_I_make_any_method_as_abstract_(enforcin.md) | [interfaces](#Q._How_to_define_interfaces?_Show_me_an_example.md)
  * [Use it](#Get_Started_-_Use_It.md)

## FAQ's cum Tutorial - Learn It ##

### Q. **How to define a class?** ###
A. There are different ways to define a class (actually function) in JavaScript and oopsjs sticks to one standard and uniform practice. Below is the code fragment as an example of class definition in oopsjs style. It's not different from what you might be already practicing.
```
  /**
   * Example class
   */
var Employee = function(){
	var _name, _id; //Private hidden variables
	
	//Public methods
	this.init = function(name, id){//init method is kind of constructor and must return 'this'
		_name = name;
		_id = id;    
		return this; //yes, need to return 'this' from here
	};

	this.getName = function(){
		return _name;
	}

	this.getEmployeeId = function(){
		return _id;
	}  
};

```

### Q. **Ok, I got it how to define a class. Now how to create instances of that class?** ###
A. That's pretty cool. Creating multiple objects of the class is also equally cool. See below code for example.
```
//Assuming the employee class has been defined as mentioned above

var emp = new Employee().init("Rajendra",185);
console.log(emp.getName()); 
console.log(emp.getEmployeeId()); 

//One more instance

var emp1 = new Employee().init("Pravin",180);
console.log(emp.getName()); 
console.log(emp.getEmployeeId()); 
```

### Q. **So can I access `_name` and `_id` from objects directly?** ###
A. No, you can't. `_name` and `_id` have been defined in the inner scope of class **Employee** so they are like private hidden variables for that class.
They will be accessible from another private or public method of that class but not from the objects directly.
```
//So this one will not work
emp._name;
//Neither this 
emp._id;
```

### Q. **Ok, so can I define private methods also? How?** ###
A. Yes, you can. Similarly the way you defined private hidden variables, you can define private hidden method.
Below code fragment demonstrates it.
```
var Employee = function(){
	var _name, _id; //Private hidden variables

	//Private getter for name - can be called only internally
	var getName = function(){//Private method
		return _name;
	}
	//Public methods
	this.getName = function(){
		return getName(); //Did you notice, not accessing private method/var using 'this'
	}
	...  
};
```

### Q. **How to access or call the internal private variables or methods** ###
A. Above code already showed it. Private variables or methods can only be accessed from another private/public method of the class.
**Accessing or calling private variable or method should be done without using 'this'.**
```
var Employee = function(){
	...
	var getName = function(){//Private method
		return _name;
	}
	//Public methods
	this.getName = function(){
		return getName(); //Same here. Accessing this.getName() will be incorrect.
	}
	...  
};
```

### Q. **Can I use**'this'**inside private methods?** ###
A. No, you can't. Well actually you can and there is no any error but it won't mean what you assume it to be.
inside private methods, 'this' does not refer to the instance but refers to the parent context in which your class is defined
or actually global **window** object.
```
var Employee = function(){
	...
	var getName = function(){//Private method
		console.log(this);// just to test. this points to your window object and not a employee
		return _name;//So accessing this._name will be incorrect.
	}
	...  
};
```

### Q. **Is there any alternative to access**'this'**inside private methods if I really have to?** ###
A. Well there is. I had actually forgotten Crockford's trick. Thanks Rob for reminding me (http://stackoverflow.com/questions/1645027/popular-javascript-inheritance-patterns/3653389#3653389). You can assign this to that in the start and then use that inside.
```
var Employee = function(){
       var that = this; //assign this to that
	...
	var getName = function(){//Private method
		console.log(that);// You can use that to refer this.
	}
	...  
};
```

### Q. **Ok, what you told is all I knew already. It's native JS featue. What's there with oopsjs?** ###
A. Yes, what you saw above is all already available in JavaScript and is combination of functions, closure etc.
Now, what you get with oopsjs is...

  * Inheritance
  * Define and implement interfaces
  * Abstract and Final methods
  * Final classes

In the next FAQ's we will talk more about these features.

### Q. **How to inherit a class and define subclass of it?** ###
A. It's pretty simple. This is how to inherit a class.
```
//Assuming the above employee class, we are now creating subclass called 'Manager'
var Manager = function(){
	//_name and _id are implicitly available
	var _reportees = [];//own private variables
	
	this.init = function(name, id){
		_super.init(name,id);//_super is available to access any private or public method of super class
		_reportees = [];
	}
	....
}.inherits(Employee);//IMP - This is how you inherit
```

### Q. **Can I inherit native objects say Array?** ###
A. Yes, but is has limited support. /**This answer will be updated soon with more details. Stay tuned**/

### Q. **What is `_super`?** ###
A. **`_super`** refers to the parent of the subclass. It is only available in the class, which is inheriting some other class.
Another good thing about **`_super`** is that using it you can actually access parent's private methods as well (if it is overridden in child). Otherwise parent private methods are available like private vars and you can simply call them by their names. So it makes parent's private methods kind of protected (i.e. private in a parent class and also private in the child classes).

### Q. **Can child class override the parent methods?** ###
A. Yes, absolutely. Child class can override parent's public as well as private methods and also if needed can call corresponding super methods inside.
As shown above, method **init** is overridden in Manager and also Employee's **init** method is called inside it. One more example below.
```
var Manager = function(){
	...
	var getName = function(){//overriding parent's private method
		return _super.getName();//Calling parent's private method
	}
	....
}.inherits(Employee);//IMP - This is how you inherit
```
### Q. **Can child class inherit from multiple parents?** ###
A. No. To keep the inheritance clean and simple. Multiple inheritance is NOT allowed. One child class can only inherit from only one parent class.

### Q. **Can I make parent class non inheritable (kind of final in Java)?** ###
A. Yes, you can. If you want your class to be non inheritable, you can make it final. Below is an example showing how to make a class final.
```
var MyFinalClass = function(){
	....
	.... 
}.isFinal();//Making the whole class as Final class (non inheritable)
```

### Q. **Ok, great. Instead of making the whole class as final, can I make any method as final (non overridable)?** ###
A. Yes, you can do that as well. You can mark any method as a final and child class will not be allowed to override it. Even invoked from child class object, always parent's method
will be called. This make parent to put certain restrictions on child to use parent only method.
```
var MyFinalClass = function(){
	....
	.... 
	this.myFinalMethod = function(){
		...
		...
	}.isFinal();//Making this method as Final
};
```

### Q. **Reverse of Final, can I make any method as an abstract (enforcing child to define it)?** ###
A. Yes.You can mark any method as an abstract and child class will be enforced to define body for it. This is kind of reverse of Final. This makes parent to put certain
restriction like child must do somethings themselves and parent will not provide any default implementation for that. Abstract method should not have body. It should be empty method.
This is how you can define abstract method.
```
var MyClass = function(){
	....
	.... 
	this.myAbstractMethod = function(){}.isAbstract();//Making this method as Abstract in this class
};
```
Class inheriting MyClass will have to have the method 'myAbstractMethod' defined in them. Also child classes can again delegate the implementation responsibility down in the hierarchy by making it abstract again.

### Q. **Like method, can the whole class be declared abstract?** ###
A. Sorry, you can't. At this moment support for abstract class is not available so you can't define abstract class.

### Q. **Is there any concept for interfaces?** ###
A. Yes. **oopsjs** provides a way to define interfaces and other classes can implement them. Interfaces are defined as simple JSON objects with EMPTY methods. One
interface can be implemented by multiple classes. Also one class can implement multiple interfaces. Implementing classes need to have the methods as defined by interface with correct number of parameters.

### Q. **How to define interfaces? Show me an example** ###
A. This is how you can define interfaces
```
//Example of Comparable interface
var IComparable = {
	comparedTo: function(obj){},
	equals: function(obj){}
};

//Few more example interfaces

var IExternalizable = {
	readExternal: function(obj){},
	writeExternal: function(obj){}
};

var IStack = {
	empty:function(){},
	peek:function(){},
	pop:function(){},
	push:function(obj){},
	search:function(obj){},
};
```
This way you can define your own interfaces as per your requirement.

### Q. **How to use those interfaces? How to make a class implement interfaces?** ###
A. Quite simple. Below example shows implementing interfaces. Note that the methods in the implementing class should be public (i.e defined with this.methodName), have same name and same number of arguments as defined in an interface. Please note that ~~implements~~ is now **impls**.
```
var Employee = function(){
	...
	//Methods from interface
	this.compareTo = function(obj){
		...
	};
	this.equals = function(obj){
		...
	};
	...  
}.impls(IComparable);
```

### Q. **How about implementing multiple interfaces?** ###
A. Yep. As said earlier you can implement multiple interfaces and this is how you can do it.
```
var Employee = function(){
	...
	//must define all methods of IComparable and IExternalizable
	...  
}.impls(IComparable,IExternalizable); //Multiple interfaces
```
OR also with this syntax
```
var Employee = function(){
	...
	//must define all methods of IComparable and IExternalizable
	...  
}.impls(IComparable).impls(IExternalizable); 
```

### Q. **What if my class is already inheriting or is final?** ###
A. All these operations can be chained together one after the other in an order. So you can have a class inheriting from another, make it final and also implement interfaces at the same time.
```
var Manager = function(){
	...
}.inherits(Employee).isFinal().impls(IComparable,IExternalizable); //chained operations
```

Also you can have them in any order as needed. **Note that the operations are applied in an order.** So for example if Parent class A has defined implementing method of an interface X and your child class B says implements first and then inherits, which will result in interface not finding the implementing method before inheritance.

```
var X = {
	x:function(y){}
};
var A = function(){
	...
	this.x = function(y){
		...
	};
	...
};

var B = function(){
	...
}.impls(X).inherits(A); //Should have to be .inherits(A).impls(X); so that x() is inherited in B before it being checked by an interface X
```

## Get Started - Use It ##

To use it, Download [oopsjs](http://code.google.com/p/oopsjs/downloads/detail?name=oops.js&can=2&q=), include in your page. Start coding your classes, interfaces and derived classes. You can also have a look at http://oopsjs.googlecode.com/files/apidocs.zip. There is also ready made example of Employee Manager that you may like to have a look at. You can get it here http://oopsjs.googlecode.com/files/example.js.

To view example source online at http://code.google.com/p/oopsjs/source/browse/trunk/examples/example.js.