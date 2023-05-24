const nodemailer=require('nodemailer')
const { google }=require('googleapis')
const config=require('./config')
const OAuth2=google.auth.OAuth2

const OAuth2_client = new OAuth2(config.clientId,config.clientSecret)
OAuth2_client.setCredentials({ refresh_token:config.refreshToken })

function send_mail(name,recipitent){
    const accessToken= OAuth2_client.getAccessToken()
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user:config.user,
            clientId:config.clientId,
            clientSecret:config.clientSecret,
            refreshToken:config.refreshToken,
            accessToken:accessToken
        }
    })

const mail_options={
    from:"Intern<${config.user}>",
    to: recipitent,
    subject:'I am on Vacation',
    html: get_html_message(name)                
}
transporter.sendMail(mail_options,function(error,result){
    if(error){
        console.log("error:",error)
    }else{
        console.log("result:",result)
    }
    transporter.close()
})

}

function get_html_message(name){
    return `<h3>${name}! I am on vaction. </h3>`
}

send_mail("Hrithik","loxaw34036@introace.com")



 



