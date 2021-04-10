import { db } from './firebase';

export const createUserInDB = user => {
  db.collection('users')
    .doc(user.uid)
    .set({
      email: user.email,
      isPremium: false
    })
    .then(() => {
      console.log('Document successfully written!');
    })
    .catch(error => {
      console.error('Error writing document: ', error);
    });
};

export const checkIfUserAlreadyExists = user => {
  const docRef = db.collection('users').doc(user.uid);

  docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        // user already exists do not do anything
      } else {
        // user does not exist create a default non premium user
        createUserInDB(user);
      }
    })
    .catch(error => {
      console.log('Error getting document:', error);
    });
};

export const checkIfUserIsPremium = (user, validationFunction) => {
  const docRef = db.collection('users').doc(user.uid);

  docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        // user exists, check if user is prem
        validationFunction(doc.data().isPremium);
      }
    })
    .catch(error => {
      console.log('Error getting document:', error);
    });
};
