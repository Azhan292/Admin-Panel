import {
  ref as storage_ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";
const uploadImage = async (file) => {
  console.log("imgs  ", file);
  if (file !== "" && file.name !== undefined) {
    return new Promise((resolve, reject) => {
      const storageRef = storage_ref(
        storage,
        "uploads/products/" + file.name + Date.now()
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          reject(error);
        },

        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            resolve(url);
          });
        }
      );
    });
  }
};
const storageUrlToPath = (file) => {
  var pictureItem = file;
  var url_token = pictureItem.split("?");
  var url = url_token[0].split("/");
  var filePath = url[url.length - 1].replaceAll("%2F", "/");
  return filePath;
};

const deleteStorageFile = (path) => {
  let sRef = storage_ref(storage, path);
  deleteObject(sRef);
};

export {
  uploadImage,
  storageUrlToPath,
  deleteStorageFile
}
