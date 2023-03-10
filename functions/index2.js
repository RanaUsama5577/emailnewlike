const functions = require("firebase-functions")
const admin = require("firebase-admin")
const nodemailer = require("nodemailer")
admin.initializeApp()
const db = admin.database()


exports.NewReview = functions.database.ref("/connections/{receiver_id}/like/{sender_id}")
    .onCreate((snapshot, context) => {
        try {
            let like = snapshot.val()
            let sender_id = context.params.sender_id
            let receiver_id = context.params.receiver_id
            console.log("sender_id   ",sender_id)
            console.log("receiver_id   ",receiver_id)
            
            // const ref = db.ref(`users/${sender_id}`);
            const ref2 = db.ref(`users/${receiver_id}`);
            return ref2.once('value', (snapshot2) => {
              console.log("snapshot2.value",snapshot2.val());
              var user2 = snapshot2.val()
              var useremail = user2?.email ?? ""
              return sendEmail(useremail)
            }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name)
            })
        
        } catch (error) {
            return error
        }
    })


    function sendEmail(email){
        const authData = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS:true,
            auth: {
              user: "edpjuntamundos@gmail.com",
              pass: "hnkkuexwonxfultk",
            },
          })
          console.log("info",email)

          var getEmailBody = getEmailBody2()
          var mailInfo  = {
            html:getEmailBody,
            from: `Juntamundos App <edpjuntamundos@gmail.com>`,
            to: email,
            subject: "Like Alert",
          }
          return authData.sendMail(mailInfo)
          .then(function() {
              console.log("successfully sent that mail")
          })
            .catch(function(err) {
              console.log("Error sending email",err)
            })
    }
    function getEmailBody2(){
        var html = `<!DOCTYPE html>
        <html
          lang="en"
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          style="margin: 0 auto !important;
          padding: 0 !important;
          height: 100% !important;
          width: 100% !important;
          background: #f1f1f1;"
        >
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="x-apple-disable-message-reformatting" />
            <title></title>
            <link
              href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
              rel="stylesheet"
            />
          </head>
          <body
            width="100%"
            style="
              margin: 0;
              padding: 0 !important;
              mso-line-height-rule: exactly;
              background-color: #f1f1f1;
        
              font-family: Lato, sans-serif;
                font-weight: 400;
                font-size: 15px;
                line-height: 1.8;
                color: rgba(0, 0, 0, 0.4);
            "
          >
            <center style="width: 100%; background-color: #f1f1f1">
              <div
                style="
                  display: none;
                  font-size: 1px;
                  max-height: 0;
                  max-width: 0;
                  opacity: 0;
                  overflow: hidden;
                  mso-hide: all;
                  font-family: sans-serif;
                "
              >
                &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
              </div>
              <div style="max-width: 600px; margin: 0 auto" class="email-container">
                <table
                  align="center"
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="margin: auto;border-spacing: 0 !important;
                  border-collapse: collapse !important;
                  table-layout: fixed !important;
                  margin: 0 auto !important;"
                >
                  <tr>
                    <td
                      valign="middle"
                      class="hero bg_white"
                      style="padding: 3em 0 2em 0;background: #fff;position: relative;
                      z-index: 0;"
                    >
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/juntamundos-app.appspot.com/o/app%20logo%2Fplay_store_512.png?alt=media&token=51a677df-5fc3-4982-b022-b2050c278903"
                        alt=""
                        style="
                          width: 150px;
                          max-width: 1500px;
                          height: auto;
                          margin: auto;
                          display: block;
                        "
                      />
                    </td>
                  </tr>
                  <tr>
                    <td
                      valign="middle"
                      class="hero bg_white"
                      style="padding: 2em 0 4em 0;background: #fff;position: relative;
                      z-index: 0;"
                    >
                      <table style="border-spacing: 0 !important;
                      border-collapse: collapse !important;
                      table-layout: fixed !important;
                      margin: 0 auto !important;">
                        <tr>
                          <td>
                            <div
                              class="text"
                              style="padding: 0 2.5em; text-align: center;color: rgba(0, 0, 0, 0.3);"
                            >
                              <h2 style="font-family: Lato, sans-serif;
                              color: #000;
                              margin-top: 0;
                              font-weight: 400;color: #000;
                font-size: 40px;
                margin-bottom: 0;
                font-weight: 400;
                line-height: 1.4;">Congratulations ????</h2>
                              <h3 style="font-family: Lato, sans-serif;
                              color: #000;
                              margin-top: 0;
                              font-weight: 400;font-size: 15px;
                font-weight: 300;">You have recieved a new like. Go to Juntamundos application to see who has liked your profile</h3>
                              <a class="btn btn-google" href="https://play.google.com/store/apps/details?id=com.edp.juntamundos&amp;gl=US" title="Google Play" style="
                              color: #fff;
                              padding: 10px 16px;
                              margin: 5px;
                              font-size: 14px;
                              line-height: 1.3333333;
                              border-radius: 6px;
                              text-align: center;
                              white-space: nowrap;
                              vertical-align: middle;
                              -ms-touch-action: manipulation;
                              touch-action: manipulation;
                              cursor: pointer;
                              -webkit-user-select: none;
                              -moz-user-select: none;
                              -ms-user-select: none;
                              user-select: none;
                              border: 1px solid transparent;
                              font-weight: 500;
                              text-decoration: none;
                              display: inline-block;
                              color: #fff;
                              background-color: #111;
                              border-color: #000;
                              padding: 3px 16px 5px 39px;
                              position: relative;
                              font-family: fontfutura;
                              font-weight: 600;
                              content: '';
                              background-image: url(https://4.bp.blogspot.com/-52U3eP2JDM4/WSkIT1vbUxI/AAAAAAAArQA/iF1BeARv2To-2FGQU7V6UbNPivuv_lccACLcB/s30/nexus2cee_ic_launcher_play_store_new-1.png);
                              background-repeat: no-repeat;
              "><span style="
          display: block;
          font-size: 12px;
        ">Get it on</span>Google Play</a>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center>
          </body>
        </html>
        `
        return html
      }