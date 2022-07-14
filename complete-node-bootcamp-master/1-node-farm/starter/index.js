const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

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

const replaceTEmplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%/g, product.productName);
  output = output.replace(/{%IMAGE%/g, product.image);
  output = output.replace(/{%PRICE%/g, product.price);
  output = output.replace(/{%FROM%/g, product.from);
  output = output.replace(/{%NUTRIENTS%/g, product.nutrients);
  output = output.replace(/{%QUANTITY%/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%/g, product.description);
  output = output.replace(/{%ID%/g, product.id);

  if (!product.organic)
    output = output.replace(/%NOT_ORGANIC%/g, "not_organic");
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    
  const { query, pathName } = url.parse(req.url, true);

  //* Overview Page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTEmplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);


    //*Product Page
  } else if (pathName === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    const product = dataObj[query.id];
    const output = replaceTEmplate(tempProduct, product);
    res.end(output);
    //*API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //*NOT Found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello World",
    });
    res.end("<h1> Page not found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening the request on port 8000");
});
