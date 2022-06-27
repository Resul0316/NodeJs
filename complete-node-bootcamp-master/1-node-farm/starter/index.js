const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

//* * * * * * * * FIles * * * * * * * * *//

//* Blocking, synchronous way
//* to comment = ctrl k c 
//* to un-comment = ctrl k u 
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./starter/txt/output.txt', textOut);
// console.log('File written!');

//* Non-Blocking, asynchronous way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) =>{
// //fs.readFile('./starter/txt/starqt.txt', 'utf-8', (err, data1) =>{ //Just to show how error works. Cooment ut upper code if you open this one.
//     if (err) return console.log('ERROR! DO IT CORRECTLY')
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) =>{
//         console.log(data2);
//         fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3) =>{
//             console.log(data3);

//             //* To write them in a one common final file
//         fs.writeFile('./starter/txt/final.txt', `${data1}\n${data2}\n${data3}`, 'utf-8', err =>{
//             console.log('Your file has been written successfully')
//         })
//         });
//     });
// });
// console.log('Will Read File!');

//* * * * * * * * * * * * * * * * *//



//* * * * * * * * Server * * * * * * * * *//
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data)


const server = http.createServer((req,res) =>{
    const pathName = req.url;;
    if ( pathName === '/' || pathName === '/overview'){
        res.end('This is the OVERVIEW');
    }else if (pathName === '/product'){
        res.end('This is the PRODUCT');
    }else if (pathName === '/api'){
        
        res.writeHead(200, {'Content-type' : 'application/json'})
        res.end(data);
        
    }
     else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello World'
        })
        res.end('<h1> Page not found</h1>')
    }
});
server.listen(8000, '127.0.0.1', ()=>{
    console.log('Listening the request on port 8000')
});
