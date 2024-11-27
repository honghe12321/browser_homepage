function b64Blob(b64: string): string {
    const mimeTypeMatch = b64.match(/^data:([^;]+);base64,/)
    if (mimeTypeMatch) {
        const mimeType = mimeTypeMatch[1]
        const data = b64.slice(mimeTypeMatch[0].length)
        const binaryStr = atob(data)
        const byteArr = new Uint8Array(binaryStr.length)
        for (let i = 0; i < binaryStr.length; i++) {
            byteArr[i] = binaryStr.charCodeAt(i)
        }
        const blob = new Blob([byteArr], {type: mimeType})
        return URL.createObjectURL(blob)
    }
    return b64
}

export {
    b64Blob
}
