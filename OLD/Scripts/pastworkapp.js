function wait(secondsTimeout){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve()
        }, secondsTimeout*1000)
    });
}

function c(classname){
    return document.getElementsByClassName(classname)
}


/**Returns document.getElementById(s)
 * 
 * @param {*} s 
 */
function $(s){
    return document.getElementById(s)
}

let leftbtn = $("left-button")
let rightbtn = $("right-button")

let origMargin = window.getComputedStyle(rightbtn).marginLeft
console.log(origMargin);

function setMarginTop_RightBtn(){
    rightbtn.style.marginTop = "-"+leftbtn.offsetHeight+"px";
}

leftbtn.onmouseenter = function(ev){
    rightbtn.style.marginLeft = origMargin.split("")
}

leftbtn.onmouseleave = function(ev){
    rightbtn.style.marginLeft = ev
}

setMarginTop_RightBtn()

window.onresize = async function(){
    await wait(.2)
    setMarginTop_RightBtn()
}