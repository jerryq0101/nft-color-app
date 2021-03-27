const Color = artifacts.require('./Color.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract('Color', (accounts) => {

    let contract

    before(async () => {
        contract = await Color.deployed()
    })


    describe ('deployment', async () => {
        it ('deploys successfully', async () => {

            contract = await Color.deployed()
            const address = contract.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await contract.name()
            assert.equal(name, 'Color')
        })

        it('has a symbol', async () => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'COLOR')
        })
    })

    describe('minting', async () => {

        it('creates a new token', async () => {
            const result = await contract.mint('#DAF7A6')
            const totalSupply = await contract.totalSupply();

            // success
            assert.equal(totalSupply, 1)
            console.log(result)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 0, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')


            // failure
            await contract.mint('#DAF7A6').should.be.rejected;
        })
    })


    describe('indexing' , async () => {

        it('lists colors', async () => {

            //mint 3 tokens
            await contract.mint('#FFC300')
            await contract.mint('#FFFFFF')
            await contract.mint('#000000')

            const totalSupply = await contract.totalSupply()

            let color
            let result = []

            for (var i = 1; i <= totalSupply; i++){
                color = await contract.colors(i-1)
                result.push(color)
            }

            let expected = ['#DAF7A6','#FFC300','#FFFFFF','#000000']
            assert.equal(result.join(','), expected.join(','))
        })
    })
})