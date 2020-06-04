
const request = require('request-promise');

class Sms {


    send_sms(no,sms_msg){
        const post_data = {
            'user_id' : '11933',
            'api_key' : '8xRQL5EGEV5HDhaKCkGT',
            'sender_id' : 'NotifyDEMO',
            'to' : no,
            'message' : sms_msg,
            // 'contact_fname' : 'banu'
        }
        const options = {
            method: 'POST',
            uri: 'https://app.notify.lk/api/v1/send',
            body: post_data,
            json: true,
        }
        request(options).then(function (response){

            return response['status']

        })
        .catch(err=>{
          console.log(err);
        })



    }

}
module.exports.Sms
