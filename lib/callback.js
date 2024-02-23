const axios = require('axios');
const qs = require('qs');

const appConfig = require('../config.json');

async function callback(req, res) {
    const data = qs.stringify({
        'client_id': appConfig.clientId,
        'client_secret': appConfig.clientSecret,
        'grant_type': 'authorization_code',
        'code': req.query.code,
        'user_type': 'Location',
        'redirect_uri': `http://82.180.162.252:3000/oauth/callback`
    });
      
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://services.leadconnectorhq.com/oauth/token',
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    }; 
 
    try {
        const response = await axios.request(config);
        const responseData = {
            data: response.data,
            code: req.query.code
        };
        
        // Formatear la respuesta JSON para una mejor legibilidad
        const formattedResponse = JSON.stringify(responseData, null, 4);
        
        return res.send(`<pre>${formattedResponse}</pre>`); // Enviar la respuesta con formato pre
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Hubo un error al procesar la solicitud.');
    }
}

module.exports = callback;
