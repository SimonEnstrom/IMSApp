var localSession = [];
var localPoint = {
  x: '',
  y: '',
  col: '',
};

const exports = {
  getLastSession: function() {
    return lastSession;
  },
  updateLastSession: function(point) {
    localPoint.x = point.x;
    localPoint.y = point.y;
    localPoint.col = point.col;
    localSession.push(localPoint);
  },
};
