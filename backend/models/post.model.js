import {Schema} from "mongoose";
import mongoose from "mongoose";

const postSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        img:{
            type: String,
        },
        title:{
            type: String,
            required: true,
        },
        slug:{
            type: String,
            unique: true,
        },
        desc:{
            type: String,
        },
        categories:{
            type: [String],
            default: [],
        },
        content:{
            type: String,
            required:true,
        },
        isFeatured:{
            type: Boolean,
            default:false,
        },
        isPublished:{
            type: Boolean,
            default:false,
        },
        visit:{
            type: Number,
            default: 0,
        },
    },
    { timestamps: true}
);

export default mongoose.model("post", postSchema);