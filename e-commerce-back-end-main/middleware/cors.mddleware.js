const cors = require("cors")

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'];
const corsOptions = {
    origin : function(origin, cb){
        if(!origin) return cb(null , true) // allow server-to-server or tools like Postman
        if(Array.isArray(allowedOrigins) && allowedOrigins.includes(origin)) {
            return cb(null , true)
        }else{
            return cb(new Error("CORS POLICY Origin Not Allowed"))
        }
    },
    credentials: true, // allow sending cookies / authorization headers
    methods:['GET','POST','PUT','DELETE'], // fixed typo from 'mehtods'
    allowedHeaders:["Content-Type","Authorization"]
}

module.exports = cors(corsOptions)