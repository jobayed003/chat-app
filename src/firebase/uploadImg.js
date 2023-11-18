import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { auth } from './config';

export const uploadImg = async (image) => {
   return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${auth.currentUser.uid}-${image.name}`;

      const storageRef = ref(storage, 'profilePic/' + fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case 'paused':
                  console.log('Upload is paused');
                  break;
               case 'running':
                  console.log('Upload is running');
                  break;
               default:
                  break;
            }
         },
         (error) => {
            reject(error);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               resolve(downloadURL);
            });
         }
      );
   });
};

// const imageUrls = await Promise.all([...images].map((image) => storeImage(image))).catch(() => {
//    setLoading(false);
//    toast.error('Images not uploaded');
//    return;
// });
