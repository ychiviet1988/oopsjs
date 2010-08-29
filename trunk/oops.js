/*
 * Copyright 2010 Rajendra Patil 
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *  
 */
/**
 * <p>This method ensures that current class has defined instance methods as defined by an implementing interfaces otherwises throws an error.<p>
 * 
 * <h3>Usage</h3>
 * <h4>1. Define an interface - as JSON object</h4>
 *  <pre>
 *	var IRenderable = {
 *		//no body please. leave it empty.
 * 		<b>render: function(){};</b> 
 *	};
 *	</pre>
 * <h4>2. Define your class and say it implemets an interface</h4>
 *  <pre>
 *	var CuteButton = function(){
 *		....
 *		//implemented method as guided by an interface IRenderable 
 *		<b>this.render = function(){...here you define body...}</b>
 *		....
 *		
 *	}.<b>implements(IRenderable)</b>; 
 *	//will throw exception if render method is not defined 
 *	</pre>
 * <h4>3. You can implement multiple interfaces as </h4>
 *  <pre>
 *	var CuteButton = function(){
 * 		...
 *	}.<b>implements(IRenderable,IClickable);</b>; 
 *  </pre> 
 *	<h4>OR like this</h4>
 *  <pre>
 *	var CuteButton = function(){
 * 		...
 *	}.<b>implements(IRenderable).implements(IClickable);</b>; 
 *  </pre>
 *
 * @param iFaces comma separated list interfaces to be implemented
 * @returns this - the same class 
 */
Function.prototype.implements = function(iFaces){
	var org = new this();
	for(var i = 0, l = arguments.length; i < l; i++){
		var iFace = arguments[i];
		for(var m in iFace){
        	if(m && m != "_super" && m != "implements" && m != "inherits" && typeof(iFace[m]) != typeof(org[m])){
				throw(this.toSource() + " does not implement '" + m +"'");
        	}
    	}
	}
	delete org;
    return this;
};

/**
 * <p>This method redefines your class with capabilities from parentClass and extends/overrides it with your own class capabailities. 
 *	The private vars and methods from parent class are also inherited. The inherited class can use <b>_super</b> variable to access parent's vars/methods 
 * <p>
 * 
 * <h3>Usage</h3>
 * <h4>1. Define your class </h4>
 *  <pre>
 *	var Employee = function(){
 * 
 *		//private variables	- actually protected - will be inherited
 *		var _name;
 *		var _employeeId;
 *		
 *		//private methods - actually protected - will be inherited
 *		var _setName = function(name){
 *			_name = name;
 *		} 
 *		var _getName = function(){
 *			return _name;
 *		}
 *		//public methods
 *		//Constructor
 *		this.init = function(name,id){
 *			_name = name;
 *			_employeeId = id;
			return this; //Most IMP - init must return this;		
 *		}
 * 		
 *		this.getName = function(){
 *			return _name;
 *		}
 *		
 *		this.getEmployeeId = function(){
 *			return _employeeId;
 *		}
 *	};
 *	</pre>
 * <h4>2. Derive the child class from above class</h4>
 *  <pre>
 *	var Manager = function(){
 *		
 * 		//own private var	
 *		var _reportees = []; 
 *
 *		//own private methods
 *		var _addReportee = function(employee){
 *			_reportees.push(employee);
 *		}
 *		
 *		//own public methods
 *		//Constructor
 *		this.init = function(name,id){
 *			_super.init(name,id);//_super points to parent
 *			_reportees = [];	
 *			return this;//Most IMP - init must return this;		
 *		};
 * 		//Method overridding
 *		this.getName = function(){
 *			return _super._getName(); //calling super's private method
 *		}
 *		
 *		this.getReportees = function(){
 *			return _reportees;
 *		}
 *		
 *	}.<b>inherits(Employee)</b>; 
 *	...
 *	...
 *  <style>i{color:red}</style> 
 *	<b>var e = new Employee().init("rpatil","1");
 *	e.getName();
 *	e.getEmployeeId();
 *	e instanceof Employee;</b> //true 
 *
 *	e.<b>_setName</b>("NewName");//<b><i>Not allowed - private method - ERROR</i></b>
 *	e.<b>_name</b>;//<b><i>Not allowd - private var - ERROR</i></b>
 * 
 *	<b>var m = new Manager().init("sumit","2");</b>
 *
 *	m.getName(); //Overrided - will be called from manager
 *	m.getEmployeeId(); //Inherited - will be called from Employee
 *	m.getReportees();
 *	m instanceof Manager; //true
 *	<b>m instanceof Employee;</b> //false. This doesn't work :(
 *
 *	m.<b>_reportees</b>;//<b><i>Not allowed - private var - ERROR</i></b>
 *	m.<b>_super</b>;//<b><i>Not allowed - _super? what is that? - ERROR</i></b>
 *	m._name;//Not allowed - private var inherited from parent - public access not allowd.
 *	...
 * 
 *	</pre>
 * <h4>3. You can inherit and implement at the same time </h4>
 *  <pre>
 *	var Manager = function(){
 * 		...
 *	}.<b>inherits(Employee).implements(IAuthor);</b>; 
 *	//Manager is inheriting employee and implementing IAuthor
 * </pre>
 * <p>and this is how <b>IAuthor</b> may look like</p>
 *  <pre>
 *	var IAuthor = {
 *		writeBooks:function(){...}
 *	}
 *  </pre> 
 *
 * @param parentClass name of the parent class from which this class will inherit properties.
 * @returns newClass - the new redifined class with properties from parent class + child class 
 */

Function.prototype.inherits = function(parentClass){
	var op = new parentClass();
	var oo = new this();
	var _s = "_s$s_";//Prefix for parent methods
	var d  = Function.depth === undefined ? (Function.depth = 0) : (Function.depth = Function.depth+1);
	var parentProps = parentClass.toString().replace(/\\s+/ig," ").replace(/}$/,"");
	var childProps = this.toString().replace(/\\s+/ig," ").replace(/function\s*(\w+)?\(\)\s*{/,"");
	
	//Comment below code if we want multiple inheritance 
	if(childProps.indexOf("_s$s_") > 0){
		throw ("Multiple inheritance not allowed.");
	}
	while(d--){_s += "_"}
	
	for(m in op){
		if(oo[m] === undefined) {
			// i.e m in parent is not overridden in child - so _super.m should resolve to this.m in this 
			// as all parent m's are inherited to child automatically
			var rgx = new RegExp("_super\\.("+m+")\s*(\(\))","ig");
			childProps = childProps.replace(rgx,"(typeof(this.$1) !== 'undefined' && ('_s$s_'==='_s$s_') ? this.$1$2 : $1$2)"); 
			//&& condition above is kind of marker to detect already inherited class
			continue;
		}
		// i.e m in parent is overridden in child - so rename parent m and resolve super.m in child to renamed m
		parentProps = parentProps.replace("this."+m,"var "+_s+m);
		childProps = childProps.replace("_super."+m,_s+m);
		delete _s;
	}
	var rgx = /_super.(\w+)/ig; //There is no real _super :). So in super.m, child actually trying to access private (actually protected) m of super which is already inherited by child
	// so replace super.m for private m's to just m's in child which are availble in child if were there is parent;
	childProps = childProps.replace(rgx,"$1");
	
	newObjectProps = "("+parentProps + childProps+")";
	delete op;
	delete oo;
	delete parentProps;
	delete childProps;
	delete this;
	//console.log(newObjectProps);
	return eval(newObjectProps); 
	// eval is EVIL but we need it here. how it will hurt us? (yes - performance is slow, any others? like loosing context anything.)
	// So far I found it to be working the way it is expected.
};

