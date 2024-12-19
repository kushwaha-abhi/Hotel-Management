const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dav7trp4i",
  api_key: "343991673178556",
  api_secret: "hO22EEIBUVazO_RHQbfm2FQpH1k", // Click 'View API Keys' above to copy your API secret
});
module.exports = cloudinary;
// export const cloudinaryConfig = async (imgUrl) => {
//   // Configuration
//   v2.config({
//     cloud_name: "dav7trp4i",
//     api_key: "343991673178556",
//     api_secret: "hO22EEIBUVazO_RHQbfm2FQpH1k", // Click 'View API Keys' above to copy your API secret
//   });

//   // Upload an image
//   const uploadResult = await v2.uploader
//     .upload(imgUrl, {
//       public_id: "shoes",
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = v2.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = v2.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
//   return autoCropUrl;
// };
