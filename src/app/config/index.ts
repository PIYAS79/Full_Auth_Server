import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path:path.join(process.cwd(),'.env')});



export default {
    db_url : process.env.DB_URL,
    port : process.env.PORT,
    jwt_secret:process.env.JWT_SECRET,
    acc_token_exp:process.env.ACCESS_TOKEN_EXP,
    ref_token_exp:process.env.REFRESH_TOKEN_EXP,
    mail_secret:process.env.MAIL_SECRET
}



