module.exports = {
    apps : [
        {
            name : "payment-link-order-system",
            script : "server.js",
            instances : 1,
            exec_mode : "fork",
            watch : false,
            autorestart : true,
            max_memory_restart : "300M",
            env : {
                NODE_ENV : "development"
            },
            env_production : {
                NODE_ENV : "production"
            }
        }
    ]
}