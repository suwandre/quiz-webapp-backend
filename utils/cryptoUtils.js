const { randomBytes } = require('crypto');

const randomString = (size) => {
    if (size === 0) {
        throw new Error('String size cannot be 0.')
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789'
    let str = ''
    const bytes = randomBytes(size)

    for (let i = 0; i < bytes.length; i++) {
        str += chars[bytes.readUInt8(i) % chars.length]
    }

    return str
}

const generateObjectId = () => {
    return randomString(10)
}

module.exports = {
    randomString,
    generateObjectId
}