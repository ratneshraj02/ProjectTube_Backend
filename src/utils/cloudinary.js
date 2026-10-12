import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!localFilePath) return null;

    //upload the file on cloudinary
    const options = { resource_type: "auto", use_filename: true, secure: true };
    const uploadResult = await cloudinary.uploader.upload(
      localFilePath,
      options
    );
    return uploadResult;
  } catch (error) {
    console.log("Temporary file deleted:", localFilePath);
    console.error(error);
  } finally {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); //  remove the locally saved temporary file  as the upload operation got failed
    }
  }
};


const deleteOnCloudinary = async (remoteFileUrl) => {
  try {
    if (!remoteFileUrl) {
      throw new ApiError(401, "remote file not found");
    }
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    const options = {
          resource_type: "auto"
    };

    const url = new URL(remoteFileUrl);
    console.log("URL", "url");
    const parts = url.pathname.split("/");

    const uploadIndex = parts.indexOf("upload");

    
    
    const deleteResult = await cloudinary.uploader.destroy("image/upload", options);
    return deleteResult;
  } catch (err) {
    throw ApiError(401, err.message || "Error while delecing remove file");
  }
}
export { uploadOnCloudinary };
