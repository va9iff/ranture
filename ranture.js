let separators = ["min", "max", "to", "from", "salt"]

export const range = (b = 1, a = 0) => [...Array(b - a).keys()].map(i => i + a)

function getRandomInt(max) {
	return Math.floor(Math.random() * max)
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min
}

function getRandomIntBetween(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getRandomIntBetweenInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

export const random = {
	number(max = 100) {
		return getRandomInt(max)
	},
	between(min, max){
		if (!(min&&max)) throw new Error("random.between requires 2 arguments (min, max)")
		return getRandomIntBetween(min, max)
	}
}

export const ranture = obj => {
	// console.log('---',obj)
	if (typeof obj != 'object') return obj
	for (let [prop, val] of Object.entries(obj)) {
		let optsStrings = prop.split(/\s+/)
		let propName = optsStrings[0]
		let opts = {}

		for (let [i, optsString] of optsStrings.entries()) 
			if (separators.includes(optsString))
				opts[optsString] = parseInt(optsStrings[i + 1])

		if (opts.to || opts.max) {
			let to = opts.to
			let from = opts.from || 0
			obj[propName] = range(to, from).map(i=>i+=opts.salt?getRandomInt(opts.salt):0).map(val)
			for (let innerObj of obj[propName]) ranture(innerObj)
			delete obj[prop]
			if (!obj[propName].some(_ => _))
				console.error("to return an object: use ()=>({}) not ()=>{}")
		}
		if (val instanceof RantureArray){
			obj[prop] = val.resolve()
		}
	}

	return obj
}

// that's actually not an array. just simple notations to resolve the array.
// arr.single will note to resolve into one random elements from the given 
// array in the ranture() mock object.
/*class RantureArray{
	notations = {}
	constructor(arr){
		this.arr = arr
	}
	resolve(){
		if (this.notations.single) return this.resolveSingle()
		return this.arr
	}
	shokola(){
		console.log('shokooooooo')
	}
	get single(){
		this.notations.single = true
		return this
	}
	resolveSingle(){
		return this.arr[getRandomInt(this.arr.length)]
	}
	filter(...args){
		this.arr = this.arr.filter(...args)
		return this
	}
	max(arg){
		this.notations.max = arg
		return this
	}
	min(arg){
		this.notations.min = arg
		return this
	}
	to(arg){
		this.notations.to = arg
		return this
	}
	from(arg){
		this.notations.from = arg
		return this
	}
	salt(arg){
		this.notations.salt = arg
		return this
	}
}*/


export class RantureArray extends Array{
	notations = {}
	constructor(...items){
		super(...items)
	}
	resolve(){
		if (this.notations.single) 
			return this[getRandomInt(this.length)]
		if (this.notations.max)
			return [...this.shuffled.slice(0, random.between(this.notations.min ?? 0, this.notations.max + 1))]

	}
	get single(){
		this.notations.single = true
		return this
	}
	get shuffled(){
		return this.sort(() => 0.5 - Math.random())
	}
	max(max){
		this.notations.max = max
		return this
	}
	min(min){
		this.notations.min = min
		return this
	}
}

let rarr = new RantureArray(2,34,4)
// console.log(rarr)

/*
let u = [1,2,4,5,43,2," fjadsl osad"]
u = new RantureArray(u)
u.shokola()

// console.log(u.filter(i=>i<3).single)

console.log(ranture({
	"val to 7": i=>u.single
}))*/