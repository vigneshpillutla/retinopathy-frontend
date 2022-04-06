import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from '../firebase';
import { set, ref as dbRef, push } from 'firebase/database';

// const storageRef = ref(storage, 'test-child');

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
  return set(updateRef, { ...data });
};

export { uploadImage, updateData };
