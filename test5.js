import { ranture, random, RantureArray } from "./ranture.js"


let pets = ['cat', 'dog', 'fish']
let places = ['europe', 'asia', 'america', 'africa', 'australia', 'antarctica']

pets = new RantureArray(...pets)
places = new RantureArray(...places)

let mock = ranture({
	"pets from 8 to 15 salt 3": lifespan => ({
		pet: pets.single,
		lifespan,
		found: places.min(1).max(4)
	})
})

console.log(JSON.stringify(mock, 0, 2))