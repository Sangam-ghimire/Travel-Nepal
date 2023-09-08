import mongoose, { Schema } from "mongoose";

interface IComment {
  id: Schema.Types.ObjectId;
  content: string;
  owner: string;
  registeredTime: mongoose.Schema.Types.Date;
} //interface for comment
interface Ilocation {
  id: Schema.Types.ObjectId;
  address: string;
} //interface for location
interface IOwner {
  email: string;
  name: string;
} //interface for owner

interface IRating{
  TrailCondition: number;
  Weather: number;
  Accessibility: number;
  overallScore: number;
} //interface for rating

//interface for post to be used in the post model
interface IPost {
  description: string;
  pictureURL: string;
  location: Ilocation;
  likes: number;
  likedBy: [string];
  comments: [IComment];
  owner: IOwner;
  rating: IRating;
  registeredTime: mongoose.Schema.Types.Date;
} //interface for post


//the below code is for the comment schema, it is nested in the post schema
const commentSchema = new Schema<IComment>({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 1500,
  },
  owner: {
    type: String
  },
  registeredTime: {
    required: true,
    type: mongoose.Schema.Types.Date,
    default: new Date()
  }
});

//the below code is for the post schema, it is the main schema
const postSchema = new Schema<IPost>({
  description: {
    type: String,
    maxlength: 1500,
  },
  
  pictureURL: {
    type: String, 
  },

  location: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "location",
    },
    address: {
      type: String,
    },
  },

  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: String,
  }],

  comments: [commentSchema],
  owner: {
    email: {
      type: String,
    },
    name: {
      type: String,
    }
  },

  rating: {
    TrailCondition: {
      type: Number,
    },
    Weather: {
      type: Number,
    },
    Accessibility: {
      type: Number,
    },
    overallScore: {
      type: Number,
    }

  },
  registeredTime: {
    required: true,
    type: mongoose.Schema.Types.Date,
    default: new Date()
  }

});

//the below code is for the post model
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post; //exporting the post model
