Ranture is a library to create custom structured mock data in seconds. 
When I made mock data, biggest difficulty was about random lengthed arrays. 
Ranture can set up a random iterations with one sentence, hierarchical 
structures, nested arrays, etc.
It uses property names as arguments to have a cleaner syntax:

```js
let pets = ['cat', 'dog', 'fish']
let places = ['europe', 'asia', 'america', 'africa', 'australia', 'antarctica']

ranturize(pets, places)
ranture({
	"myNum from 8 to 10 salt 3": i => ({
		title: `number: ${i}`,
		pet: pets.single,
		foundIn: places.max(2).unique
	})
})
```

The first word before space is actual property's name.
Followed by `key value` fashioned arguments:
# Loop Keywords
- `from` iterator starts from this
- `min` iterator starts from a random number greater than (>=) this
- `to` iterator goes up to this
- `max` iterator goes up to a random number less than (<=) this
- `salt` maximum ± random number to add to the iterator every run


# `RantureArray`
- `.single` returns a random element
- `.shuffled` returns a its shuflled version
- `.sample(n)` returns a sample from it with `n` numbers of elements
- `.min(n)` returns random sample with length greater than n
- `.max(n)` returns random sample with length less than n

To use `.min(a)` and `.max(b)` both, you should write them in `.min(a).max(b)` 
fashion since `.max(b)` may return an array with length lower than `a` but 
`.min(a)` leaves a mark for `.max(b)` if they're in row.