const sum = require('./sum');
test('add 1 + 2 should be equal to 3',()=>{
    expect(sum(1,2)).toBe(4);
})