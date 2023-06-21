import { message } from "antd";
import axios from "axios";
import { jsPDF } from "jspdf";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import {
  productIds,
  shippings,
  shppingMethods,
  upgradesIds,
} from "./zendirectData";
const user = JSON.parse(localStorage.getItem("user"));
//base url from env file
const baseUrl = process.env.REACT_APP_BASE_URL;
const saveProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(baseUrl + "product/addProduct", {
        token: window.atob(user.token),
        ...data,
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

const saveCoupon = (data) => {
  // console.log("data is ", data);
  // console.log("token is", window.atob(user.token));
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(baseUrl + "coupon/saveCoupon", {
        token: window.atob(user.token),
        ...data,
      });
      resolve(res.data);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};
// const saveCoupon = (data) => {
//   console.log("data is ", data);
//   console.log("token is", window.atob(user.token));
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await axios.post(baseUrl + "stripe/createCoupon", {
//         token: window.atob(user.token),
//         ...data,
//       });
//       resolve(true);
//     } catch (e) {
//       console.log(e);
//       reject(e);
//     }
//   });
// };
const backgroundPlaceOrderapi = (psuser, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sdata = JSON.parse(localStorage.getItem("user"));
      let token = window.atob(sdata?.token);
      let url = `${baseUrl}order/backgroundPlaceOrder`;
      const res = await axios.post(url, {
        token,
        data,
        user: psuser,
      });
      let resp = res.data;
      if (res.status === 200 || res.status === 201) {
        console.log("bgapi", res.data);
        resolve(resp);
      } else {
        console.log("bgapi", res.data);
        reject(res.data);
      }
      message.success("your order is under process!");
    } catch (error) {
      console.log(error);
      reject(error);
      message.error(error.message);
      // message.error("something went wrong!");
    }
  });
};
const updateOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sdata = JSON.parse(localStorage.getItem("user"));
      let token = window.atob(sdata?.token);
      const res = await axios.post(`${baseUrl}order/updateOrder`, {
        ...data,
        id,
        token,
      });
      resolve(res.data);
      // message.success("Successfully Done!");
    } catch (error) {
      console.log(error);
      reject(error);
      message.error(error.message);
    }
  });
};
const uploadImage = async (file, path) => {
  // && file.name !== undefined
  if (file && file !== "") {
    let type = file?.type?.split("/")[1];
    return new Promise((resolve, reject) => {
      const myStorageRef = storageRef(
        storage,
        `${type ? path + "." + type : path + ".png"}`
      );
      const metadata = {
        contentType: file?.type ? file?.type : "image/png",
      };
      const uploadTask = uploadBytesResumable(myStorageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          alert("check internet connection and try again!");
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

const urlToImage = (imgs) => {
  return new Promise((resolve, reject) => {
    let imgsArr = [];
    imgs.map(async (v, i) => {
      var img = new Image();
      img.src = v.url;
      img.onload = async function () {
        console.log(img);
        imgsArr.push({ id: v.id, img: img });
        if (imgsArr.length === imgs.length) {
          resolve(imgsArr);
        }
      };
    });
  });
};
const ImgsToPdf = async (photos, orderNumber) => {
  return new Promise(async (resolve, reject) => {
    //  let d = Math.floor(Math.random() * 9000000) + 1000000;
    let path = `albumImagesPdf/${orderNumber}`;
    let pageNumber = 0;
    try {
      let imgs = await urlToImage(photos);
      const doc = new jsPDF("p", "px", [580, 580], true);
      imgs?.map(async (v, i) => {
        //  var img = new Image();
        //  img.src = v.url;
        //  img.onload = async function () {
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        pageNumber !== 0 && doc.addPage();
        pageNumber = pageNumber + 1;
        // doc.text(`Picswagger:${name}`, 10, 40);
        // doc.text(`Page No: ${i + 1}`, 10, 60);
        // doc.text(`Album Order No: ${v.id + 1}`, 10, 80);
        // doc.textWithLink(`Click To Open Image`, 10, 100, {
        //   url: v.url,
        // });
        doc.addImage(
          v.img,
          (width - 512) / 2,
          (height - 512) / 2,
          512,
          512,
          v.url,
          "FAST"
        );
        if (pageNumber === photos.length) {
          let blob = doc.output("blob");
          // doc.save(path + ".pdf");
          let url = await uploadImage(blob, path);
          resolve(url);
        }
        //  };
      });
    } catch (error) {
      reject(error);
    }
  });
};
const zenDirectPlaceOrderApi = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sdata = JSON.parse(localStorage.getItem("user"));
      let token = window.atob(sdata?.token);
      let url = `${baseUrl}order/placeorderToZenDirect`;
      const res = await axios.post(url, {
        token,
        data: data,
      });
      let resp = JSON.parse(res.data);
      if (resp.Message) {
        reject(resp.Message);
      } else {
        resolve(resp);
      }

      // message.success("Successfully Done!");
    } catch (error) {
      console.log(error);
      reject(error);
      message.error(error.message);
      // message.error("something went wrong!");
    }
  });
};

const placeOrderGetAddress = async (data, pdfUrl) => {
  return new Promise((resolve, reject) => {
    let productId = data?.size?.includes("Mini")
      ? productIds["Mini"][data?.pages]
      : productIds["Classic"][data?.pages];
    let upgradeId = upgradesIds[data?.albumCoverName];
    let newAddresses = [];
    data?.addresses?.map(async (addr, i) => {
      let modifiedAddress = {
        name: addr.name,
        street: addr.address,
        city: addr.city,
        state: addr.state,
        postalcode: addr.zip,
        country: addr?.country,
      };
      let num = i + 1;
      let zenDirectData = {
        partnerOrdernumber: data?.orderNumber.toString() + num,
        lineItems: [
          {
            lineNum: `${i + 1}`,
            quantity: `${addr?.quantity}`,
            productId: productId,
            files: [
              {
                path: pdfUrl,
                pageCount: `${data?.albumImages.length}`,
              },
            ],
            upgrades: [
              {
                id: upgradeId,
              },
            ],
            variables: [
              {
                variableName: "orderIndex",
                variableValue: `${i}`,
              },
              {
                variableName: "orderId",
                variableValue: data?._id,
              },
            ],
          },
        ],
        returnAddress: modifiedAddress,
        recipients: {
          recipientAddress: [modifiedAddress],
        },
        shipMethod: shppingMethods[shippings[addr?.shippingValue].label],
      };
      try {
        let resp = await zenDirectPlaceOrderApi(zenDirectData);
        newAddresses.push({
          ...addr,
          statusId: resp?.statusId,
          order_id: resp?.order_id,
        });
        if (newAddresses.length === data?.addresses.length) {
          updateOrder(data?._id, {
            orderPlaceToZendirect: true,
            addresses: newAddresses,
          });
          resolve(newAddresses);
        }
      } catch (error) {
        console.log(error);
        reject(error);
        return null;
      }
    });
  });
};
const sendSuccessMail = (order, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sdata = JSON.parse(localStorage.getItem("user"));
      let token = window.atob(sdata?.token);
      let url = `${baseUrl}order/sendOrderSuccessMail`;
      const res = await axios.post(url, {
        user,
        order,
        token,
      });
      resolve(res.data);
      message.success("Successfully Done!");
    } catch (error) {
      console.log(error);
      reject(error);
      message.error(error.message);
    }
  });
};
const placeOrderFromAdmin = async (data, user) => {
  try {
    let pdfUrl = data?.filePath
      ? data?.filePath
      : await ImgsToPdf(data?.albumImages, data?.orderNumber);
    console.log("file path got successfully");
    // console.log(pdfUrl);
    let newAddresses = data?.addresses?.every((v) => v.order_id)
      ? data?.addresses
      : await placeOrderGetAddress(data, pdfUrl);
    console.log("order place to zendirect successfully");
    // console.log(newAddresses);

    if (pdfUrl && newAddresses) {
      // console.log(data?._id);
      await updateOrder(data?._id, {
        addresses: newAddresses,
        filePath: pdfUrl,
        orderPlaceToZendirect: true,
      });
      sendSuccessMail(data, user);
    }
  } catch (error) {
    console.log(error);
  }
};
const removeInfluencer = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let sdata = JSON.parse(localStorage.getItem("user"));
      let token = window.atob(sdata?.token);
      let url = `${baseUrl}influencer/removeInfluencer/${id}`;
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
      message.error(error.message);
    }
  });
};
const acceptInfluencer = async (id) => {
  // console.log("yuor id is ", id);
  return new Promise(async (resolve, reject) => {
    try {
      let sdata = JSON.parse(localStorage.getItem("user"));
      let token = window.atob(sdata?.token);
      let url = `${baseUrl}influencer/acceptInfluencer/${id}`;
      const res = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
      message.error(error.message);
    }
  });
};
const allInfluencers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sdata = JSON.parse(localStorage.getItem("user"));
      let token = window.atob(sdata?.token);
      let url = `${baseUrl}influencer/allInfluencers`;
      // console.log(url)
      let headers = {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      };
      const res = await axios({
        method: "get",
        url: url,
        headers: headers,
      });
      resolve(res.data);
      // console.log('apiiiiiiiiii',res.data)
    } catch (error) {
      reject(error);
      message.error(error.message);
    }
  });
};

export {
  saveProduct,
  saveCoupon,
  backgroundPlaceOrderapi,
  updateOrder,
  uploadImage,
  urlToImage,
  ImgsToPdf,
  zenDirectPlaceOrderApi,
  placeOrderGetAddress,
  sendSuccessMail,
  placeOrderFromAdmin,
  removeInfluencer,
  acceptInfluencer,
  allInfluencers,
};
