/**
 Example usage of oops.js
 */

//Define a class
/**
 * Employee class to represent employee which has employee id and name as private properties.
 *
 * @class Employee
 * @author Rajendra Patil <rrpatil26@gmail.com>
 *
 */
var Employee = function(){

		//private variables	- actually protected - will be inherited
		/**
		 * @private _name
		 */
		var _name;
		/**
		 * @private _employeeId
		 */

		var _employeeId;

		//private methods - actually protected - will be inherited
		/**
		 * @private _setName
		 * @param name - the name to be set
		 */
		var _setName = function(name){
			_name = name;
		}

		/**
		 * @private _getName
		 * @returns - the name of an employee
		 */
		var _getName = function(){
			return _name;
		}

		//public methods
		/** This is kind of constructor to initialize the object properties.
		 * @public
		 * @constructs
		 * @param name - name of an employee
		 * @param id - id of an emlployee
		 * @returns this - init must always return this
		 */
		this.init = function(name,id){
			_name = name;
			_employeeId = id;
			return this;
		}
		/** Public method to get name of an employee.
		 * @public
		 * @returns name
		 */
		this.getName = function(){
			return _name;
		}.isFinal();//Don't allow child classes to override this

		/** Public method to get employee id of an employee.
		 * @public
		 * @returns employeeId
		 */
		this.getEmployeeId = function(){
			return _employeeId;
		}

		/** Public method to to represent this class as a string
		 * @public
		 * @returns string - string representation of an employee
		 */
		this.asString = function(){
			return "Employee { name: "+_name+", id: "+_employeeId+" }";
		};

		/**
		  test abstract method. Child class must implement/override this method
		 */
		 this.mustOverride = function(){}.isAbstract();

};

var IComparable = {
	compareTo:function(obj){ }
}

/**
 * Manager class to represent an employee which has reportees too.
 * this class is herited from Employee
 * @see Employee
 * @class Manager
 * @author Rajendra Patil <rrpatil26@gmail.com>
 * @extends Employee
 */
var Manager = function(){

		//own private var
		/** @private */
		var _reportees = [];

		//own private methods
		/** @private */
		var _addReportee = function(employee){
			_reportees.push(employee);
		};

		//own public methods
		//Constructor
		/** This is kind of constructor to initialize the object properties.
		 * @public
		 * @constructs
		 * @param name - name
		 * @param id - employee id
		 * @returns this - init must always return this
		 */
		this.init = function(name,id){
			_super.init(name,id);//_super points to parent
			_reportees = [];
			return this;
		};
		//Method overridding

		/** Public method to to get manager name - overrided from Employee
		 * @see Employee#getName
		 * @public
		 * @returns name - manager name
		 */
		 //Final is Employee class so can't be overriden here
		/*this.getName = function(){
			return _super._getName(); //calling super's private method
		};*/

		/** Public method to to get list of reportees
		 * @public
		 * @returns reportees - array of employees who are reporting to this manager
		 */
		this.getReportees = function(){
			return _reportees;
		}
		/** Public method to to represent this class as a string - overrided from Employee
		 * @see Employee#asString
		 * @public
		 * @returns string - string representation of an Manager
		 */
		this.asString = function(){
			return "Manager { name: "+_name+", id: "+_employeeId+" }";
		}
		this.compareTo = function(obj){
			return this == obj;
		}
		/**
		abstract method from parent class is implemented here otherwise will throw an exception
		*/
		this.mustOverride = function(){}
		//.isAbstract(); can be marked abstract here again to delete to child

}.inherits(Employee).impls(IComparable);

console.log("Creating new Employee with name Rajendra, id: 1");
var emp = new Employee().init("Rajendra","1");
console.log(emp.asString());
console.log("Creating another Employee with name Vishal, id: 2");
var emp1 = new Employee().init("Vishal","2");
console.log(emp1.asString());
console.log("Creating Manager (derived from Employee) with name Anand, id: 3");
var mgr = new Manager().init("Anand","3");
console.log(mgr.asString());

console.log("Adding above employees to the managers reportees list");

var r = mgr.getReportees();
console.log("Adding " + emp.asString());
r.push(emp);
console.log("Adding " + emp1.asString());
r.push(emp1);
console.log("Now listing managers reportees");

for(var i = 0, rpts =  mgr.getReportees(), l = rpts.length; i < l; i++){
	console.log("Reportee " + (i+1) + ": " + r[i].asString());
}

// Below commented code is to experiment more on our private, public and inheritance mechanism

//var e = new Employee().init("rpatil","1");
//e.getName();
//e.getEmployeeId();
//e instanceof Employee; //true

//e._setName("NewName");//Not allowed - private method - ERROR
//e._name;//Not allowd - private var - ERROR

//var m = new Manager().init("Anand","2");
//m.getName(); //Overrided - will be called from manager
//m.getEmployeeId(); //Inherited - will be called from Employee
//m.getReportees();
//m instanceof Manager; //true
//m instanceof Employee; //false. This doesn't work :(

//m._reportees;//Not allowed - private var - ERROR
//m._super;//Not allowed - _super? what is that? - ERROR
//m._name;//Not allowed - private var inherited from parent - public access not allowd.