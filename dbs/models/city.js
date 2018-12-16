const mongoose = require('mongoose');
const citySchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
});
export default mongoose.model('City', citySchema);
