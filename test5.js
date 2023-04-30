import { ranture, random, RantureArray } from "./ranture.js"


let pets = ['cat', 'dog', 'fish']
let places = ['europe', 'asia', 'america', 'africa', 'australia', 'antarctica']

pets = new RantureArray(...pets)
places = new RantureArray(...places)

let mock = ranture({
	"myNum from 8 to 10 salt 5": i => ({
		pet: pets.single,
		lifespan: i,
		found: places.min(1).max(2)
	})
})

console.log(JSON.stringify(mock, 0, 2))