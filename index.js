const app = require("./app/app");
const config = require("./config/config");
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');

const PORT = config.PORT;

const openapiSpecification = YAML.load('./swagger.yaml');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`);
});
