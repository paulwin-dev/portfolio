
/** A shortcut to document.getElementsByClassName(className) or document.getElementById()
 * determined whether the argument starts with a "#" or a "."
 * 
 */
function $(classNameorId){

    if (classNameorId.charAt(0) == "#"){
        return document.getElementById(classNameorId.replace("#", ""));
    }
    return document.getElementsByClassName(classNameorId.replace(".", ""));
}

function wait(secondsTimeout){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve
        }, secondsTimeout*1000)
    });
}

function c(classname){
    return document.getElementsByClassName(classname)
}


const linkedBoxes = document.getElementsByClassName("open-link-on-click");
const linkedButtons = c("main-button")

for (const box of linkedBoxes){
    box.addEventListener('click', ()=>{
        const classes = box.className.split(' ')
        open(classes[1], "_blank")
    })
}

for (const e of linkedButtons){
    console.log(e.dataset)
    e.addEventListener('click', ()=>{
        open(e.dataset.linkto,"_self")
    })
}