const config = require('../config.json');
const fs = require('fs'); // Módulo para trabajar con el sistema de archivos

async function initiateAuth(req, res) {
    const clientId = req.params.clientId;
    const clientSecret = req.params.clientSecret;
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const fileName = `${ip.replace(/\./g, '-')}.json`
    console.log('Initiate', clientId)
    console.log('Initiate', clientSecret)
    console.log("FileName", fileName)

    // Cargar el archivo config.json
    // let config = require('../config.json');

    // // Actualizar los valores en el objeto config
    // config.clientId = clientId;
    // config.clientSecret = clientSecret;

    // // Escribir los cambios de vuelta al archivo config.json
    // fs.writeFileSync('./config.json', JSON.stringify(config, null, 2), 'utf-8');
    
    const options = {
        requestType: "code",
        redirectUri: `http://82.180.162.252:3000/oauth/callback`,
        clientId: clientId,
        clientSecret: clientSecret,
        scopes: [
            "businesses.readonly",
            "businesses.write",
            "calendars.readonly",
            "calendars.write",
            "calendars/events.readonly",
            "calendars/events.write",
            "calendars/groups.readonly",
            "calendars/groups.write",
            "calendars/resources.readonly",
            "calendars/resources.write",
            "campaigns.readonly",
            "conversations.readonly",
            "conversations.write",
            "conversations/message.readonly",
            "conversations/message.write",
            "contacts.readonly",
            "contacts.write",
            "forms.readonly",
            "forms.write",
            "invoices.readonly",
            "invoices.write",
            "invoices/schedule.readonly",
            "invoices/schedule.write",
            "invoices/template.readonly",
            "invoices/template.write",
            "links.readonly",
            "links.write",
            "locations.write",
            "locations.readonly",
            "locations/customValues.readonly",
            "locations/customValues.write",
            "locations/customFields.readonly",
            "locations/customFields.write",
            "locations/tasks.readonly",
            "locations/tasks.write",
            "locations/tags.readonly",
            "locations/tags.write",
            "locations/templates.readonly",
            "medias.readonly",
            "medias.write",
            "opportunities.readonly",
            "opportunities.write",
            "saas/company.read",
            "saas/company.write",
            "saas/location.read",
            "saas/location.write",
            "surveys.readonly",
            "users.readonly",
            "users.write",
            "workflows.readonly",
            "snapshots.readonly",
            "oauth.write",
            "oauth.readonly",
            "snapshots.write"
        ]
    };
    return res.redirect(`${config.baseUrl}/oauth/chooselocation?response_type=${options.requestType}&redirect_uri=${options.redirectUri}&client_id=${options.clientId}&scope=${options.scopes.join(' ')}`);
}

module.exports = initiateAuth;
