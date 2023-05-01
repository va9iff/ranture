import { ranture, random } from "../ranture.js"

let itemToLog = ranture({
	"hi min  10 to 11 salt 5": aa => ({
		val: aa,
		j: "kaka",
		"checks to 2": () => ({
			no: random.between(20,30)
		}),
	}),
	aconst: 7,
})

console.log(JSON.stringify(itemToLog, null, 4))

