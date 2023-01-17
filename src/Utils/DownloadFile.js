export const downloadFile = (fileBlob, name) => {
    var a = document.createElement('a');
    let url = window.URL.createObjectURL(new Blob([fileBlob],{type: "octet/stream"}));
    a.href = url;
    a.download = name
    document.body.append(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}