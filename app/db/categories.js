const antibacterialGels = require('./products/antibacterialGels');
const disinfectants = require('./products/disinfectants');
const faceMasks = require('./products/faceMasks');
const faceShields = require('./products/faceShields');
const gloves = require('./products/gloves');
const toiletPaper = require('./products/toiletPaper');

const categories = [
    {
        "title": "Cubrebocas",
        "url": "cubrebocas",
        "message": "Nueva colección",
        "imageName": "cubrebocas",
        "products": faceMasks
    },
    {
        "title": "Gel antiséptico",
        "url": "gel_antibacterial",
        "message": "Nueva colección",
        "imageName": "gel",
        "products": antibacterialGels
    },
    {
        "title": "Papel higiénico",
        "url": "papel_higienico",
        "message": "Nueva colección",
        "imageName": "papel",
        "products": toiletPaper
    },
    {
        "title": "Guantes",
        "url": "guantes",
        "message": "Nueva colección",
        "imageName": "guantes",
        "products": gloves
    },
    {
        "title": "Desinfectantes",
        "url": "desinfectantes",
        "message": "Nueva colección",
        "imageName": "desinfectantes",
        "products": disinfectants
    },
    {
        "title": "Protectores",
        "url": "protectores_faciales",
        "message": "Nueva colección",
        "imageName": "protector",
        "products": faceShields
    },
];

module.exports = categories;