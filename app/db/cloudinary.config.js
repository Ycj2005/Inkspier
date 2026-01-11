// CLOUDINARY_URL=cloudinary://529229237222931:ojxhLVkazVyoydaBOhOP-S022qM@disiotvlr
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary;