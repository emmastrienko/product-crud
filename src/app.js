const http = require("http");
const PORT = process.env.PORT || 3000;

const productsService = require("./productsService");
const getRequestData = require("./utils");

const server = http.createServer(async (req, res) => {
  if (req.url === "/products" && req.method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify(productsService.getProducts()));
  } else if (req.url.match(/\products\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[2];
    const numId = Number(id);

    productsService.getProductsById(numId, (err, product) => {
      if (err) {
        res.writeHead(404, {
          "content-type": "application/json",
        });
        res.end(JSON.stringify({ error: err }));
      } else {
        res.writeHead(200, {
          "content-type": "application/json",
        });
        res.end(product);
      }
    });
  } else if (req.url.match("/products") && req.method === "POST") {
    const productData = await getRequestData(req);

    productsService.saveProduct(productData, (err, newProduct) => {
      if (err) {
        res.writeHead(500, {
          "content-type": "application/json",
        });
        res.end(JSON.stringify({ error: err }));
      } else {
        res.writeHead(201, {
          "content-type": "application/json",
        });
        res.end(newProduct);
      }
    });
  } else if (req.url.match(/\products\/([0-9]+)/) && req.method === "PUT") {
    const id = Number(req.url.split("/")[2]);
    const productData = await getRequestData(req);
    productsService.updateProduct(id, productData, (err, product) => {
      if (err) {
        res.writeHead(404, {
          "content-type": "application/json",
        });
        res.end(JSON.stringify({ error: err }));
      } else {
        res.writeHead(200, {
          "content-type": "application/json",
        });
        res.end(product);
      }
    });
  } else if (req.url.match(/\products\/([0-9]+)/) && req.method === "DELETE") {
    const id = Number(req.url.split("/")[2]);

    productsService.deleteProduct(id, (err) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Product not found or could not be deleted",
          })
        );
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product deleted successfully" }));
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
