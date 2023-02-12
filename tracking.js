function generateTrackingID() {
  let trackingID = "1Z";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //create two random Characters
  for (let i = 0; i < 2; i++) {
    trackingID += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  for (let i = 0; i < 8; i++) {
    trackingID += Math.floor(Math.random() * 10);
  }
  return trackingID;
}

module.exports = generateTrackingID;
