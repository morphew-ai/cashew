// input:
// title = "Compra no crédito aprovada"
// body = "Sua compra no cartão final 2270 no valor de R$ 135,28, dia 15/07/2025 às 10:16, em MERCADOPAGO DEISEML CAMPINAS BRA, foi aprovada."

// output:
// params

var regex = /Sua compra no cartão final (\d{4}) no valor de R\$ (.+,.+), dia (\d{2}\/\d{2}\/\d{4}) às (\d{2}:\d{2}), em (.*?), foi aprovada./;
var match = body.match(regex);
var card = match[1];
var amount = match[2].replace('.','').replace(',','.');
var date = match[3];
var hour = match[4];
var local = match[5];

// Converte data e hora para ISO 8601
var splittedDate = date.split('/');
var isoDate = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}T${hour}:00`;

var airtable_data = {
  records: [
    {
      fields: {
        Type: 'Credit Card',
        Card: card,
        Amount: amount,
        Payee: local,
        Date: isoDate,
        Latitude: gl_latitude,
        Longitude: gl_longitude,
        mapUrl: gl_map_url 
      }
    }
  ]
}

var cards = {
    '8982': ['Cartao C6 Pessoal', 'Pessoal'],
    '2270': ['Cartao C6 Pessoal', 'Pessoal'],
    '0138': ['Cartao C6 Pessoal', 'Pessoal'],
    '8520': ['Cartao C6 Gelagoela', 'Gelagoela'],
    '3169': ['Cartao C6 Gelagoela', 'Vilacare'],
};

var locals = {
  'BELLA PAULISTA         SAO PAULO     BRA' : ['Bella Paulista', 'Alimentacao', 'Almoço/Jantar'], 
  'CAFE DO PONTO          SAO PAULO     BRA' : ['Cafe do Ponto', 'Alimentacao', 'Almoço/Jantar'], 
  'GN CAFE                SAO PAULO     BRA' : ['Athenas Café', 'Alimentacao', 'Almoço/Jantar'], 
  'ATHENAS CAFE           SAO PAULO     BRA' : ['Athenas Restaurante', 'Alimentacao', 'Almoço/Jantar'],
  'ATHENAS RESTAURANTE    SAO PAULO     BRA' : ['Athenas Pizza', 'Alimentacao', 'Almoço/Jantar'],
  'NUTRICAR               SANTANA DE PA BRA' : ['Nutricar C6', 'Alimentacao', 'Café'],
  'PAYGO*GRAND COFFEE     Sao Paulo     BRA' : ['Lanchonete C6', 'Alimentacao', 'Almoço/Café'],
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Alimentacao', ''],
  'LORD BYRON             SAO PAULO     BRA' : ['Lord Byron', 'Entretenimento', 'Balada'], 
  'ABC BAR                SAO PAULO     BRA' : ['ABC Bailão', 'Entretenimento', 'Balada'], 
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Entretenimento', ''],
  'Wellhub Gympass BR Gym Sao Paulo     BRA' : ['Gympass', 'Saude', 'Academia'],
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Saude', ''],
  'PAYPAL      *UBER BR   SAO PAULO     BRA' : ['Uber', 'Transporte', ''],
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Entretenimento', ''],
  'PETZ ANGELICA          SAO PAULO     BRA' : ['Petz', 'Pets', ''],
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Entretenimento', ''],
  'Google One             SAO PAULO     BRA' : ['Google', 'Digital', ''],
}

var account = cards[card]?.[0] ?? 'Caixa';
var category = cards[card]?.[1] ?? 'Indefinido';

var merchant = locals[local.toUpperCase()]?.[0] ?? local;
var subcategory = locals[local.toUpperCase()]?.[1] ?? 'Indefinido';
var details = locals[local.toUpperCase()]?.[2] ?? 'Indefinido';

var notes = `Cartao: ${card}\nValor: ${amount}\nData: ${date}\nHora: ${hour}\nEstabelecimento: ${local}\nMapa: ${gl_map_url}`;

var cashew_data = {
        amount: '-' + amount,
        title: '[' + merchant + '] ' + details,
        category: category,
        subcategory: subcategory,
        date: isoDate,
        account: account,
        notes: notes
    };


var params = new URLSearchParams(cashew_data).toString();
