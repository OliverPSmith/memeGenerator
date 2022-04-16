const imageFileInput = document.querySelector('#imageFileInput');
const topTextInput = document.querySelector('#topTextInput');
const bottomTextInput = document.querySelector('#bottomTextInput');
const canvas = document.querySelector('#meme');

let image;

imageFileInput.addEventListener('change', () => {
    const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

    image = new Image();
    image.src = imageDataUrl;

    image.addEventListener('load', () => {
        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
    }, { once: true });

});

topTextInput.addEventListener('change', () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener('change', () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
   const ctx = canvas.getContext('2d');
   const width = image.width;
   const height = image.height;
   const fontSize = Math.floor(width / 10);
   const yOffSet = height / 25;

   // update canvas background
   canvas.width = width;
   canvas.height = height;
   ctx.drawImage(image, 0, 0);

   // prepare text
   ctx.strokeStyle = 'black';
   ctx.lineWidth = Math.floor(fontSize / 6);
   ctx.fillStyle = 'white';
   ctx.textAlign = 'center';
   ctx.lineJoing = 'round';
   ctx.font = `${fontSize}px sans-serif`;

   // add top text
   ctx.textBaseline = 'top';
   ctx.strokeText(topText, width / 2, yOffSet);
   ctx.fillText(topText, width / 2, yOffSet);

   // add bottom text
   ctx.textBaseline = 'bottom';
   ctx.strokeText(bottomText, width / 2, height - yOffSet);
   ctx.fillText(bottomText, width / 2, height - yOffSet);
};

// inverting the picture
/*
const filterBtn = document.querySelector('#invert-filter');

filterBtn.addEventListener('click', () => {
    canvas.classList.toggle('invert');
}); */


// save the picture
const saveBtn = document.querySelector('#save');
saveBtn.addEventListener('click', () => {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'image.png';
    link.click();
});