
const accessControlConditions = [
    {
        contractAddress: '0x89b597199dAc806Ceecfc091e56044D34E59985c',
        standardContractType: 'ERC721',
        chain,
        method: 'ownerOf',
        parameters: [
            '3112'
        ],
        returnValueTest: {
            comparator: '=',
            value: ':userAddress'
        }
    }
]