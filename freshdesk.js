var request = require('request');


/**
 * @param ticketData data of the ticket to create
 * @param ticketData.description
 * @param ticketData.subject
 * @param ticketData.email
 * @param ticketData.priority
 */
var createTicket = function (ticketData, callback) {
    const defaultValues = {
        description: 'NO DESCRIPTION',
        subject: 'NO SUBJECT',
        email: 'NO EMAIL',
        priority: 1,
        status: 2,
        source: 7
    };
    /* Object.keys(ticketData).forEach(function(key, index, arrayKeys){
         defaultValues[key] = ticketData[key];
     });*/
    const merged = Object.assign({}, defaultValues, ticketData);
    request.post(process.env.FRESHDESK_URL, {
        'auth': {
            'user': process.env.FRESHDESK_USER,
            'pass': 'thereisnoapipassword'
        },
        body: merged,
        json: true
    }, function (error, httpResponse, body) {
        callback(error, body.id);
    });

};
exports.createTicket = createTicket;
