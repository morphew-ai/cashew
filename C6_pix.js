var regex = /R\$ (.+,.+), para (.*?), em (\d{2}\/\d{2}\/\d{4})/;
var match = texto.match(regex);
var amount = match[1].replace('.','').replace(',','.');
var payee = match[2];
var date = match[3];

// Converte data e hora para ISO 8601
var splittedDate = date.split('/');
var isoDate = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}T$00:00:00`;

var airtable_data = {
  records: [
    {
      fields: {
        Type: 'PIX',
        Amount: amount,
        Payee: payee,
        Date: isoDate,
        Latitude: gl_latitude,
        Longitude: gl_longitude,
        MapUrl: gl_map_url 
      }
    }
  ]
}

var airtable_json = JSON.stringify(airtable_data, null, 2);
