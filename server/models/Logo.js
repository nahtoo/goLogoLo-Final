var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  backgroundColor: String,
  borderColor: String,
  borderWidth: { type: Number, min: 0, max: 100 },
  borderRadius: { type: Number, min: 0, max: 100 },
  padding: { type: Number, min: 0, max: 100 },
  margin: { type: Number, min: 0, max: 100 },
  height: { type: Number, min: 0, max: 100 },
  width: { type: Number, min: 0, max: 100 },
  lastUpdate: { type: Date, default: Date.now },
  imageURL: [{
    url: String,
    x: Number,
    y: Number,
    width: Number,
    height: Number
  }],
  texts: [{
    text: String,
    x: Number,
    y: Number,
    fontSize: { type: Number, min: 2, max: 144 },
    color: String,
  }]
});

module.exports = mongoose.model('Logo', LogoSchema);