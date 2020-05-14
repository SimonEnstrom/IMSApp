import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

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
  console.log(
    'Saving point key / point / id' + key + ' / ' + point + ' / ' + id,
  );
  storage.save({
    key: key,
    id: id,
    data: point,
  });
}
function clearStorage() {
  storage.clearMap();
}

const exp = {
  storePoint: function(key, xin, yin, didCollidein, id) {
    var point = {
      x: xin,
      y: yin,
      didCollide: didCollidein,
    };
    console.log('savePoint(lsR, value)', point);
    savePoint(key, point, id);
  },
  retreiveSession: function(key) {
    storage.getAllDataForKey(key).then(points => {
      return points;
    });
  },
  clearAllData: function() {
    clearStorage();
  },
};

export default exp;
