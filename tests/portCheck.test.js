const portCheck = require('../utils/list_helper').portCheck
const config = require('../utils/config')

test('test of current port', () => {
    const result = portCheck(config.PORT)

    expect(result).toBe(3003)
})