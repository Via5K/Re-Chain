export const validateName = (name) => {
  if (name.length < 3) return false;
  return /^[a-zA-Z\s.,]+$/.test(name);
};

export const validateAddress = (name) => {
  if (name.length < 8) return false;
  return /^[a-zA-Z0-9\s.,]+$/.test(name);
};

export const validateID = (ID) => {
  if (ID.length != 10) return false;
  let isnum = /^\d+$/.test(ID);
  if (!isnum) return false;
  return true;
};

export const validateFile = (filePath) => {
  // var fileInput =
  //     document.getElementById('file');

  // var filePath = fileInput.value;

  // Allowing file type
  var allowedExtensions = /(\.doc|\.docx|\.odt|\.pdf|)$/i;

  if (!allowedExtensions.exec(filePath)) {
    alert('Invalid file type');
    // fileInput.value = '';
    return false;
  }

  return true;
};
