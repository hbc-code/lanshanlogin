const buttons = document.querySelectorAll('button')
const ipts = document.querySelectorAll('input')

postMessage = function(url,{data,headers,...custom}){
  let config = {
      method: 'post',
      body:JSON.stringify(data||{}),
      headers:{
          'Content-Type':data?'application/json':''
      },
      ...custom
  }
  return fetch(url,{...config})
      .then(response =>{
          let res = response.json()
          if(response.ok){
              return res
          }
      })
}

function weatherlgl(){
  for(const ipt of ipts){
    if(ipt.value.length < 3){
      return false
    }
  }
  return true
}

function tip(msg){
  const span = document.createElement('span')
  span.innerText =msg
  document.body.appendChild(span)
  setTimeout(()=>{
    document.body.children[2].remove()
  },2000)
}

for (const ipt of ipts) {
  ipt.oninput = (e) => {
    if(e.target.value.length >= 3){
      e.target.className = 'legalipt'
    }else{
      e.target.className = 'illegalipt'
    }
    if(e.target.value == ''){
      e.target.className = ''
    }
  }
}
ipts[2].oninput = (e) => {
  if(e.target.value == ipts[1].value && ipts[1].value != ''){
    e.target.className = 'legalipt'
  }else{
    e.target.className = ''
  }
}
buttons[1].onclick = () => {
  window.location.href = '/login'
}
buttons[0].onclick = () => {
  if(weatherlgl()){
    let data = {
      acct:ipts[0].value,
      psw:ipts[1].value
    }
    postMessage('/register',{
      data,
      method:'post'
    })
    .then(
      res => {
        if(res.code == 0){
          window.location.href = '/login'
        }else{
          tip(res.msg)
        }
      }
    )
  }
}