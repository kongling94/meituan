import mongoose from 'mongoose';
const productsSchema = new mongoose.Schema({
  poiInfos: {
    type: Array,
    require: true
  }
});
export default mongoose.model('Products', productsSchema);
