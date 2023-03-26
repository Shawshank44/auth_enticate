const fs = require('fs')
const crypto = require('crypto')
const path = require('path')


const createAuth = (authname)=>{
    const authpath = path.join(__dirname,'auth')
    const namepath = path.join('auth',`${authname}.json`)
    fs.mkdirSync(authpath)
    fs.writeFileSync(namepath,JSON.stringify([]))
}
// createAuth('customers')

const createAuthdata = (authname,datas,encrypt)=>{
    const paths = path.join('auth',`${authname}.json`)

    if (!fs.existsSync(paths)){
        throw new Error('no auth exists')
    }

    const read = JSON.parse(fs.readFileSync(paths))

    if (datas.hasOwnProperty('password') && encrypt === true){
        const hash = crypto.createHmac('sha256','salt').update(datas.password).digest('hex')
          datas.password = hash
      }

    const exists = read.some(obj =>obj.password === datas.password)

    if (!exists) {
        read.push(datas)
    }
    
    fs.writeFileSync(paths,JSON.stringify(read))
}

// createAuthdata('superuser',{name : 'shashank',password : 'shashank'},true)

const authenticate = (authname,datas)=>{
    const paths = path.join('auth',`${authname}.json`)
    if (!fs.existsSync(paths)){
        throw new Error('no auth exists')
    }

    const read = JSON.parse(fs.readFileSync(paths))

    if (datas.hasOwnProperty('password')){
        const hash = crypto.createHmac('sha256','salt').update(datas.password).digest('hex')
          datas.password = hash
    }

    const filter = read.filter((data)=> data.password === datas.password)

    return filter


}

// const aut = authenticate('superuser',{name : 'shashank',password : 'shashank'})
// console.log(aut);








