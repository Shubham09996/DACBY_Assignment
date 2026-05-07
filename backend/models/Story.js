import mongoose from 'mongoose';

const storySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    points: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
    },
    postedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model('Story', storySchema);
export default Story;
