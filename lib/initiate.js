const config = require('../config.json');

async function initiateAuth(req, res) {
    const clientId = req.params.clientId;
    const clientSecret = req.params.clientSecret;
    const options = {
        requestType: "code",
        redirectUri: `http://localhost:3000/oauth/callback/${clientId}/${clientSecret}`,
        clientId: clientId,
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
