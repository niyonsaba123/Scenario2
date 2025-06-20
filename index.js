const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
  const sessionId = req.body.sessionId || '';
  const serviceCode = req.body.serviceCode || '';
  const phoneNumber = req.body.phoneNumber || '';
  const text = req.body.text || '';

  const input = text.split('*');
  const level = input.length;

  let response = '';
  res.set('Content-Type', 'text/plain');

  // === Level 1 ===
  if (text === '') {
    response = `CON Welcome to favourite food app, please choose language,\nMurakaza neza kuri favourite food app, Hitamo ururimi,\n1. English\n2. Kinyarwanda`;
  }

  // === English Flow ===
  else if (input[0] === '1') {
    if (level === 1) {
      response = `CON Select the dish you like most\n1. Chips and Chicken\n2. Beef and green Plantain\n3. Rice and beans\n4. Cassava Bread and greens\n5. Back`;
    } else if (level === 2) {
      switch (input[1]) {
        case '1':
          response = `END Your favourite food is Chips and Chicken, that is so unhealthy, do not eat it regularly.`;
          break;
        case '2':
          response = `END Your favourite food is Beef and green Plantain, that is healthy, as long as you eat it less than 5 times a week.`;
          break;
        case '3':
          response = `END Your favourite food is Rice and beans. That is healthy, as long as you drink a lot of water and eat some green vegetables.`;
          break;
        case '4':
          response = `END Your favourite food is Cassava Bread and greens, that is healthy. Verify that there is not too much oil in the greens.`;
          break;
        case '5':
          response = `CON Welcome to favourite food app, please choose language,\nMurakaza neza kuri favourite food app, Hitamo ururimi,\n1. English\n2. Kinyarwanda`;
          break;
        default:
          response = `END Invalid selection.`;
      }
    }
  }

  // === Kinyarwanda Flow ===
  else if (input[0] === '2') {
    if (level === 1) {
      response = `CON Hitamo ibiryo Ukunda\n1. Ifiriti n’Inkoko\n2. Agatogo\n3. Umuceri n’ibishyimbo\n4. Ubugari n’isombe\n5. Gusubira inyuma`;
    } else if (level === 2) {
      switch (input[1]) {
        case '1':
          response = `END Ibiryo ukunda ni ifiriti n’inkoko, Si byiza ku buzima ntukabirye buri kenshi.`;
          break;
        case '2':
          response = `END Ibiryo ukunda ni agatogo ni byiza ku buzima iyo ubiriye utarengeje icuro 5 mu cyumweru.`;
          break;
        case '3':
          response = `END Ibiryo ukunda ni umuceri n’ibishyimbo. Ni byiza ku buzima mu gihe wanyweye amazi menshi ukarya n’imboga.`;
          break;
        case '4':
          response = `END Ibiryo ukunda ni ubugari n’isombe ni byiza ku ubuzima, ugenzure neza niba isombe ritarimo amavuta menshi.`;
          break;
        case '5':
          response = `CON Welcome to favourite food app, please choose language,\nMurakaza neza kuri favourite food app, Hitamo ururimi,\n1. English\n2. Kinyarwanda`;
          break;
        default:
          response = `END Hitamo ntibashije kumenyekana.`;
      }
    }
  }

  // Fallback
  else {
    response = `END Invalid input. Please try again.`;
  }

  res.send(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`USSD app running on port ${PORT}`));