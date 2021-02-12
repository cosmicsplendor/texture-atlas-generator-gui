const downloadData = ({ data, name, format }) => {
    const link = document.createElement("a")
    link.setAttribute("href", data)
    link.setAttribute("download", `${name}.${format}`)
    link.dispatchEvent(
        new MouseEvent("click"), 
        {
            bubbles: true,
            cancelable: true,
            view: window
        }
    )

    setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
}

export const text = ({ name, format, body }) => {
    const txtBlob = new Blob([body], { type: 'text/plain' })
    const textData = URL.createObjectURL(txtBlob)
    
    downloadData({ data: textData, name, format })
}

export const canvas = ({ canvasID, name, format }) => {
    const cnv = document.getElementById(canvasID)
    const imageData = cnv.toDataURL(`image/${format}`)

    downloadData({ data: imageData, name, format })
}