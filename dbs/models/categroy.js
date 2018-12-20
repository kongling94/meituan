import mongoose from 'mongoose';
const categroySchema = new mongoose.Schema({
  city: {
    type: String
  },
  types: {
    type: Array,
    require: true
  },
  areas: {
    type: Array,
    require: true
  }
});
export default mongoose.model('Categroy', categroySchema);
