  !function() {
document.body.style.paddingTop = '20px'

!function append_modal() {
  mmmodal = document.createElement('dialog')
  mmmodal.setAttribute('class', 'mmmodal')
  mmmodal.style = `
    background-color: rgba(0,0,0,.7);
    border-top-right-radius : 30px; 
    border-bottom-right-radius : 30px; 
    border-bottom-left-radius : 30px; 
    border: 1px solid purple;
    padding: 5px;
    box-shadow: 0 0 6px purple;
    min-height: 300px;
    color: white;
    font-size: large;
    text-align: center;
    min-width: 310px;
opacity: 0;
transition: opacity 0.7s ease-out;
    `
let lb = document.createElement('label'), 
i1 = document.createElement('input'), 
i2 = document.createElement('input'), 
i3 = document.createElement('input'),
i4 = document.createElement('input')

lb.textContent = 'Text edit mode'
i1.type = 'checkbox' 
i1.onchange =function(){f_content_editable(this)}
lb.appendChild(i1)
mmmodal.appendChild(lb)

i2.placeholder='type background color'
i2.oninput=function(){f_change_color(this)}
mmmodal.appendChild(i2)

i3.type = 'number' 
i3.placeholder='type degrees to rotate page'
i3.oninput = function(){f_change_deg(this)}
mmmodal.appendChild(i3)

i4.placeholder='text color'
i4.oninput = function(){f_change_text(this)}
mmmodal.appendChild(i4) 

  document.body.appendChild(mmmodal)
}()

function f_content_editable(t=event.currentTarget){
  document.body.contentEditable = t.checked
alert('Text edit mode set to ' +document.body.contentEditable) 
}
function f_change_color(t=event.currentTarget){
  document.body.style.backgroundColor = t.value.trim()
  Array.from(document.querySelectorAll("h1")).forEach(elem=>elem.style.backgroundColor = t.value.trim())
  Array.from(document.querySelectorAll("h2")).forEach(elem=>elem.style.backgroundColor = t.value.trim())
  Array.from(document.querySelectorAll("div")).forEach(elem=>elem.style.backgroundColor = t.value.trim())
  Array.from(document.querySelectorAll("span")).forEach(elem=>elem.style.backgroundColor = t.value.trim())
  Array.from(document.querySelectorAll("a")).forEach(elem=>elem.style.backgroundColor = t.value.trim())
  Array.from(document.querySelectorAll("h3")).forEach(elem=>elem.style.backgroundColor = t.value.trim())
  Array.from(document.querySelectorAll("h4")).forEach(elem=>elem.style.backgroundColor = t.value.trim())
  Array.from(document.querySelectorAll("h5")).forEach(elem=>elem.style.backgroundColor = t.value.trim())
  Array.from(document.querySelectorAll("h6")).forEach(elem=>elem.style.backgroundColor = t.value.trim())


}
function f_change_deg(t=event.currentTarget){
  document.body.style.transform = `rotate(${t.value}deg)`
}

function f_change_text(t=event.currentTarget){
  document.body.style.color = t.value.trim()
    Array.from(document.querySelectorAll("div")).forEach(elem=>elem.style.color = t.value.trim())
}

function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 400, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 5000, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
      
    }, false)
  
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        callback(swipedir)
      
    }, false)
}

swipedetect(document.getElementsByTagName(`body`)[0], swipedir=>{
if (swipedir == 'right') {
mmmodal.showModal()
mmmodal.style.opacity = 1
} else if (swipedir == 'left') {
Array.from(document.querySelectorAll('.mmmodal')).forEach(mmmodal=>{
mmmodal.style.opacity = 0
setTimeout(()=>{mmmodal.close()},600)
})
}
}) // end of swipedetect
    
    
}()  
