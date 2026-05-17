import swaggerJsdoc from "swagger-jsdoc";

const options = {

    definition: {

        openapi: "3.0.0",

        info: {
            title: "Payment Link Order System API",
            version: "1.0.0",
            description: "API documentation"
        },

        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },

    apis: [
        "src/routes/*.js"
    ]
};

const swaggerSpec =
    swaggerJsdoc(options);



export default swaggerSpec;