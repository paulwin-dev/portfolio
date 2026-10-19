import { wait } from "../util/wait.js"
import { sendCommision } from "./sendCommision.js"

function id(x){
    return document.getElementById(x)
}

const sendButton = id("submit-req-button")
const projName = id("project-name-inp")
const projDesc = id("project-desc-inp")
const projBudget = id("project-budget-inp")
const projDeadline = id("project-deadline-inp")
const contact = id("usr-contact-inp")


function send(){
    const desc = `
Project Name: *${projName.value}*
Project Description:
${projDesc.value}
Estimated Pay: *${projBudget.value}* 
Estimated Deadline: *${projDeadline.value}*
`
    
    const embed = [
        {
            "author": {
                "name": contact.value
            },  
            "title": "**New Commision!**",
            "description": "You have received a new commision request from "+contact.value,
            "color": 4578926,
            "fields": [
                {
                    "name": "Project Info:",
                    "value": `Name: ${projName.value} \n Description: ${projDesc.value} \n Estimated Deadline: ${projDeadline.value}`
                },
                {
                    "name": "Budget:",
                    "value": `The estimated scripting budget for this project is **${projBudget.value}**.`
                }
            ]
            
        }
    ]
    sendCommision(embed)
    sendButton.value = "Sent!"
    sendButton.disabled = true
    wait(60).then(function(){
        sendButton.disabled = false
    })
}

export function manageButtons(){

    sendButton.onclick = send
}