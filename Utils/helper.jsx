export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
const getLocalImage = (filename) => {
  try {
    return require(`../assets/${filename}`);
  } catch (err) {
    return null; // Or require a placeholder like require('../assets/placeholder.png')
  }
};
 