function saveBlob(blob,objName){
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url = window.URL.createObjectURL(blob);
    const currDate = new Date();
    var date = currDate.getDate();
    var month = currDate.getMonth() + 1;
    var years = currDate.getFullYear();
    var hours = currDate.getHours();
    var minutes = currDate.getMinutes();
    var seconds = currDate.getSeconds();
    const uniqueName = date + "_" + month + "_" + years + ":" + hours + "_" + minutes + "_" + seconds; 
    // console.log(uniqueName);
    const fileName = objName + ":" + uniqueName + ".png";
    // console.log(fileName);
    a.href = url;
    a.download = fileName;
    a.click();
}

export {saveBlob}