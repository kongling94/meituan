const mongoose = require('mongoose');
const ProvinceSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
});
export default mongoose.model('Province', ProvinceSchema);
