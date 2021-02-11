export default ({ format, name, body }) => {
    var txtBlob = new Blob([body], { type: 'text/plain' })
    var link = document.createElement("a")
    var dataURL = URL.createObjectURL(txtBlob)

    link.setAttribute("href", dataURL)
    link.setAttribute("download", `${name}.${format}`)
    link.dispatchEvent(
    new MouseEvent("click"), {
        bubbles: true,
        cancelable: true,
        view: window
    })

    setTimeout(() => {
        window.URL.revokeObjectURL(dataURL);
        link.remove();
    }, 100);
}