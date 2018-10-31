import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';


const config = {
  apiKey: 'AIzaSyDUjkv7ntAsRsXYAlo9ssXDaX1oPf9vaBs',
  authDomain: 'montoux-types.firebaseapp.com',
  projectId: 'montoux-types',
};

firebase.initializeApp(config);


const db = firebase.firestore();

db.settings({
  // Disable deprecated features
  timestampsInSnapshots: true,
});

db.enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.error('Not caching data locally because multiple tabs with this page are open.');
    } else if (err.code === 'unimplemented') {
      console.error("Not caching data locally because the browser can't handle it.");
    } else {
      console.error('Not caching data locally because an unexpected error occurred.');
      console.error(err);
    }
    console.error("No biggie, you're not missing out on anything too special.");
  });


export class Bug {
  timestamp: firestore.Timestamp;

  constructor(public isTypeBug: boolean) {
    this.timestamp = firestore.Timestamp.now();
  }
}

export interface Counts {
  typeBugs: number;
  otherBugs: number;
}

const bugs = db.collection('bugs');

export function addBug(bug: Bug): Promise<firestore.DocumentReference> {
  return bugs.add(Object.assign({}, bug));
}

export async function countBugs(): Promise<Counts> {
  return {
    typeBugs: (await bugs.where('isTypeBug', '==', true).get()).size,
    otherBugs: (await bugs.where('isTypeBug', '==', false).get()).size,
  };
}
