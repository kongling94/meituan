const mongoose = require('mongoose');
const poiSchema = new mongoose.Schema({
  name: {
    type: String
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  },
  areaCode: {
    type: String
  },
  tel: {
    type: String
  },
  addr: {
    type: String
  },
  type: {
    type: String
  },
  module: {
    type: String
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  }
});
export default mongoose.model('Poi', poiSchema);
