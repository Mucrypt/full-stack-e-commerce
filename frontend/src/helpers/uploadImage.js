const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', "e-commerce_products");
 
    try {
       const dataResponse = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_CLOUDINARY_NAME}/image/upload`, {
          method: 'POST',
          body: formData
       });
 
       const data = await dataResponse.json();
       
       // Return the response to use the URL in the component
       return data;
    } catch (error) {
       console.error('Error uploading image:', error);
       return null;  // Handle errors by returning null
    }
 }
 
 export default uploadImage;
 