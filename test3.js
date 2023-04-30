import { ranture, random, RantureArray } from "./ranture.js"

let rarr = new RantureArray(10,88,34,12,42,15)

// let result = ranture({
	// k: rarr.max(2).min(2)
// })
// 
// console.log(result)


let test = i => {
	console.log(ranture({
		k: rarr.max(4).min(3)
	}))
}

for (let k=0; k<20; k++){
	test(k)
}

// console.log(ranture({k: rarr.max(2)}))