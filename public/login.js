const buttons = document.querySelectorAll('button')
const ipts = document.querySelectorAll('input')

function tip(msg){
  const span = document.createElement('span')
  span.innerText =msg
  document.body.appendChild(span)
  setTimeout(()=>{
    document.body.children[2].remove()
  },2000)
}

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

buttons[1].onclick = () => {
  window.location.href = '/register'
}
buttons[0].onclick = () => {
  let data = {
    acct:ipts[0].value,
    psw:ipts[1].value
  }
  postMessage('/login',{data,method:'post'})
  .then(
    res => {
      tip(res.msg)
    }
  )
}