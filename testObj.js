class OB {
	constructor(observer) {
		this.observer = observer;
	}
	getName() {
		return "name";
	}

	getAge = () => {
		return 1;
	};
}
const ob = new OB(1);
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(ob)));

console.log(Object.getPrototypeOf(ob).hasOwnProperty("getName"));
console.log(Object.getPrototypeOf(ob).propertyIsEnumerable("getName"));

console.log(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(ob)));

console.log(ob.hasOwnProperty("getName"));
console.log(ob.propertyIsEnumerable("getName"));
