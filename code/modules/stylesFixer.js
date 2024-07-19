export function fixStyles(){
    const lastElementOfPastWork = document.getElementById("past-work").lastElementChild
    lastElementOfPastWork.style.marginBottom = getComputedStyle(lastElementOfPastWork).marginTop;

    const usrNameDisp = document.getElementById("name-text")
    const nameBounds = usrNameDisp.getBoundingClientRect()

    const nameWidth = nameBounds.width + nameBounds.x
    const viewportWidth = window.innerWidth

    

    if (nameWidth > viewportWidth){
        
    }
}