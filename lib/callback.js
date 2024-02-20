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
        
        // Dividir el access_token y el refresh_token en partes más pequeñas para mostrarlos en varias líneas
        const { access_token, refresh_token, ...rest } = responseData.data;
        const { code } = responseData.code;
        const access_token_parts = access_token.match(/.{1,100}/g) || [];
        const refresh_token_parts = refresh_token.match(/.{1,100}/g) || [];
        const formatted_access_token = access_token_parts.join('\n');
        const formatted_refresh_token = refresh_token_parts.join('\n');

        // Construir la respuesta con los tokens divididos en varias líneas
        const responseHtml = `
            <pre>${JSON.stringify(rest, null, 4)}</pre>
            <pre>${JSON.stringify(code)}</pre>
            <h3>Access Token:</h3>
            <pre>${formatted_access_token}</pre>
            <h3>Refresh Token:</h3>
            <pre>${formatted_refresh_token}</pre>
        `;
        
        return res.send(responseHtml);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Hubo un error al procesar la solicitud.');
    }
}

module.exports = callback;
