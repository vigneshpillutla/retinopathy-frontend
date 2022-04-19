import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from '../firebase';
import { set, ref as dbRef, push, get, child } from 'firebase/database';
import keys from 'config/keys.js';
import axios from 'axios';
// const storageRef = ref(storage, 'test-child');

const serverDomain = keys.serverDomain;

const uploadImage = async (file) => {
  const date = new Date();
  const storageRef = ref(storage, `${date.getTime()}-testImgs`);
  await uploadBytes(storageRef, file);

  return getDownloadURL(storageRef);
};

/**
 *
 * @param {*} path The json path of the key to update
 * @param {*} data The data to replace or push
 * @param {*} mode 'replace' or 'push'
 */
const updateData = (path, data, mode = 'replace') => {
  let updateRef = dbRef(database, path);

  if (mode === 'push') {
    updateRef = push(updateRef);
  }
  return set(updateRef, data);
};

const getData = (path) => {
  const readRef = dbRef(database);

  return get(child(readRef, path));
};

/**
 *
 * @param {*} uid The unique ID of the user
 * @returns An object with values as the imageURL
 */
const getImages = (uid) => {
  const path = `users/${uid}/images`;

  return getData(path);
};

// *****************************Backend API Calls***************************************

/**
 * @description Backend API call for severity
 */
const getSeverity = (imageURL) => {
  const url = `${serverDomain}/severity?imageURL=${encodeURIComponent(
    imageURL
  )}`;
  return axios.get(url);
};

const getLabels = () => {
  return axios.get(`${serverDomain}/labels`);
};

export { uploadImage, updateData, getData, getImages, getSeverity, getLabels };
