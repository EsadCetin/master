async getMarkers() {
  const events = await firebase.firestore().collection('events').get()
    .then(querySnapshot => {
      querySnapshot.docs.map(doc => {
        console.log('LOG 1', doc.data());
        return doc.data();
      });
    });
  console.log('LOG 2', events);
  return events;
}
async getMarker() {
  const snapshot = await firebase.firestore().collection('events').get()
  return snapshot.docs.map(doc => doc.data());
}