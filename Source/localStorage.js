import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

var standardKey = 'askgjal';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 10000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

function savePoint(key, point, id) {
  storage.save({
    key: key,
    id: id,
    data: point,
  });
}
function clearStorage() {
  storage.clearMap();
}
function getLastId(key) {
  storage.getIdsForKey(key).then(ids => {
    return ids[ids.size - 1];
  });
}
function storeLastKey(keyValue) {
  storage.save({
    key: standardKey,
    data: keyValue,
  });
}

const exp = {
  storePoint: function(key, xin, yin, didCollidein, id) {
    var point = {
      x: xin,
      y: yin,
      didCollide: didCollidein,
    };
    savePoint(key, point, id);
  },
  retreiveSession: function(key, callback) {
    storage
      .getAllDataForKey(key)
      .then(points => {
        callback(points);
      })
      .catch(error => {
        console.log('Error fetching local data: ', error);
      });
  },
  getNextId: function(key) {
    return getLastId(key) + 1;
  },
  clearAllData: function() {
    clearStorage();
  },
  saveLastKey: function(keyToSave) {
    storeLastKey(keyToSave);
  },
  getLastKey: function(callback) {
    storage
      .load({
        key: standardKey,
      })
      .then(result => {
        callback(result);
      })
      .catch(error => {
        console.log('Error retreiving last key used: ', error);
      });
  },
};

export default exp;
