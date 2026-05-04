import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "IS API Documentation",
            version: "1.0.0",
            description: "API documentation for information system.",
        },
        servers: [
            {
                url: "http://localhost:3000", // Your API base URL
            },
        ],
    },
    apis: ["./index.js"], // Path to your API file for Swagger comments
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};