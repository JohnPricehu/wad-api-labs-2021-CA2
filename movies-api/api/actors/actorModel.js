import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  id: { type: Number,  unique: true, required: true},
  name: {type: String, required: true },
  place_of_birth: {type: String, required: true },
  known_for_department: {type: String, required: true },
});

export default mongoose.model('Actor', ActorSchema);