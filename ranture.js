let separators = ["min", "max", "to", "from", "salt"]

export const range = (b = 1, a = 0) => {
	return [...Array(b - a).keys()].map(i => i + a)
}

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
	between(min=0, max=0){
		return getRandomIntBetween(min, max)
	}
}

export const ranture = obj => {
	if (typeof obj != 'object') return obj
	for (let [prop, val] of Object.entries(obj)) {
		let optsStrings = prop.split(/\s+/)
		let propName = optsStrings[0]
		let opts = {}

		for (let [i, optsString] of optsStrings.entries()) 
			if (separators.includes(optsString))
				opts[optsString] = parseInt(optsStrings[i + 1])

		if (opts.to || opts.max) {
			opts.to ??= opts.from ? random.between(opts.from+1, opts.max+1) : opts.min ? random.between(opts.min+1, opts.max+1) : 1
			opts.from ??= opts.min?random.between(opts.min, opts.to+1) : 0
			obj[propName] = range(opts.to+1, opts.from).map(i=>i+=opts.salt?getRandomInt(opts.salt):0).map(val)
			for (let innerObj of obj[propName]) ranture(innerObj)
			delete obj[prop]
			if (obj[propName].every(_ => !_))
				console.warn("to return an object: not ()=>{} use ()=>({})")
		}
		if (val instanceof RantureArray){
			obj[prop] = val.resolve()
		}
	}
	return obj
}

let minmaxOrderError = (min, max) => `if both used .min() should come right before .max()
suggestion to use both: .min(${min}).max(${max})`

let biggerMinError = `.min() got lower value than length; using .max() before .min() can cause it.`

export class RantureArray extends Array{
	notations = {}
	constructor(...items){
		super(...items)
	}
	resolve(){
		return [...this]
	}
	get single(){
		return this[getRandomInt(this.length)]
	}
	get shuffled(){
		return this.sort(() => 0.5 - Math.random())
	}
	max(max = this.length){
		let result = this.shuffled.slice(0, random.between(this.minCalled ?? 0, max + 1))
		result.maxCalled = max
		return result
	}
	min(min = 0){
		if (min>this.length) console.warn(biggerMinError)
		let result = this.shuffled.slice(0, random.between(min, this.length + 1))
		result.minCalled = min
		if (this.maxCalled) console.warn(minmaxOrderError(min, this.maxCalled))
		return result
	}
	sample(n){
		return this.shuffled.slice(0, n)
	}
	get repeatable(){
		let preserved = [...this]
		for (let i of this.keys()){
			this[i] = preserved[getRandomInt(this.length)]
		}
		return this
	}
}

let rarr = new RantureArray(2,34,4,32,4,1,3,6)
// console.log(rarr.repeatable)

/*
let u = [1,2,4,5,43,2," fjadsl osad"]
u = new RantureArray(u)
u.shokola()

// console.log(u.filter(i=>i<3).single)

console.log(ranture({
	"val to 7": i=>u.single
}))*/