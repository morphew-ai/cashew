// input:
// title = "Compra no crédito aprovada"
// body = "Sua compra no cartão final 2270 no valor de R$ 135,28, dia 15/07/2025 às 10:16, em MERCADOPAGO DEISEML CAMPINAS BRA, foi aprovada."

// output:
// params

var cards = {
    '8982': ['Cartao C6 Pessoal', 'Pessoal'],
    '2270': ['Cartao C6 Pessoal', 'Pessoal'],
    '0138': ['Cartao C6 Pessoal', 'Pessoal'],
    '8520': ['Cartao C6 Gelagoela', 'Gelagoela'],
    '3169': ['Cartao C6 Gelagoela', 'Vilacare'],
};

var locals = {
  'BELLA PAULISTA         SAO PAULO     BRA' : ['Bella Paulista', 'Alimentacao'], 
  'CAFE DO PONTO          SAO PAULO     BRA' : ['Cafe do Ponto', 'Alimentacao'], 
  'GN CAFE                SAO PAULO     BRA' : ['Athenas Café', 'Alimentacao'], 
  'ATHENAS CAFE           SAO PAULO     BRA' : ['Athenas Restaurante', 'Alimentacao'],
  'ATHENAS RESTAURANTE    SAO PAULO     BRA' : ['Athenas Pizza', 'Alimentacao'],
  'NUTRICAR               SANTANA DE PA BRA' : ['Nutricar C6', 'Alimentacao'],
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Alimentacao'],
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Alimentacao'],
  'LORD BYRON             SAO PAULO     BRA' : ['Lord Byron', 'Entretenimento'], 
  'ABC BAR                SAO PAULO     BRA' : ['ABC Bailão', 'Entretenimento'], 
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Entretenimento'],
  'Wellhub Gympass BR Gym Sao Paulo     BRA' : ['Gympass', 'Saude'],
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Saude'],
  'PAYPAL      *UBER BR   SAO PAULO     BRA' : ['Uber', 'Transporte'],
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Entretenimento'],
  'PETZ ANGELICA          SAO PAULO     BRA' : ['Petz', 'Pets'], 
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' : ['xxxxxxxxxx', 'Entretenimento'],
}

var regex = /Sua compra no cartão final (\d{4}) no valor de R\$ (.+,.+), dia (\d{2}\/\d{2}\/\d{4}) às (\d{2}:\d{2}), em (.*?), foi aprovada./;
var match = body.match(regex);
var card = match[1];
var value = match[2].replace('.','').replace(',','.');
var date = match[3];
var hour = match[4];
var local = match[5];
var notes = `Cartao: ${card}\nValor: ${value}\nData: ${date}\nHora: ${hour}\nEstabelecimento: ${local}\nMapa: ${gl_map_url}`;

// Converte data e hora para ISO 8601
var splittedDate = date.split('/');
var isoDate = `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}T${hour}:00`;

var cartoes = {
    '0138': 'Cartao C6 Vilacare',
    '8520': 'Cartao C6 Gelagoela',
    '3169': 'Cartao C6 Gelagoela',
};

var account = cards[card]?.[0] ?? 'Caixa';
var category = cards[card]?.[1] ?? 'Indefinido';

var merchant = locals[local.toUpperCase()]?.[0] ?? local;
var subcategory = locals[local.toUpperCase()]?.[1] ?? 'Indefinido';
  
var cashew_data = {
        amount: '-' + value,
        title: '[' + merchant + ']',
        category: category,
        subcategory: subcategory,
        date: isoDate,
        account: account,
        notes: notes
    };

var params = new URLSearchParams(cashew_data).toString();
