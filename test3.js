import { ranture, random, RantureArray } from "./ranture.js"

let rarr = new RantureArray(1,88,34)

let result = ranture({
	k: rarr.single
})

console.log(result)