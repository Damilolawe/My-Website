// Browsers can safely decode/resize JPEG, PNG and WebP via Canvas; the
// resulting bytes have no EXIF/GPS data. Edge independently sanitizes input.
export async function prepareImageUpload(form) {
  if (!(form instanceof FormData)) return form;
  const file=form.get("file");
  if (!(file instanceof Blob) || !["image/jpeg","image/png","image/webp"].includes(file.type))
    return form;
  if (typeof document === "undefined" || typeof Image === "undefined")
    throw Error("Image conversion requires a browser.");
  const blobURL=URL.createObjectURL(file);
  let img;
  try {
    img=new Image();
    img.decoding="async";
    await new Promise((resolve,reject)=>{
      img.onload=resolve;
      img.onerror=()=>reject(Error("Unable to decode the selected image."));
      img.src=blobURL;
    });
    if(!img.naturalWidth||!img.naturalHeight)
      throw Error("The selected image is invalid.");
    const factor=Math.min(1,1600/img.naturalWidth,1600/img.naturalHeight,
      Math.sqrt(4_000_000/(img.naturalWidth*img.naturalHeight)));
    const canvas=document.createElement("canvas");
    canvas.width=Math.max(1,Math.round(img.naturalWidth*factor));
    canvas.height=Math.max(1,Math.round(img.naturalHeight*factor));
    const ctx=canvas.getContext("2d");
    if(!ctx)throw Error("Unable to prepare your image.");
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    const encode=async(type,quality)=>
      await new Promise(resolve=>canvas.toBlob(resolve,type,quality));
    let outputType=file.type==="image/jpeg"?"image/jpeg":"image/png";
    let output=await encode(outputType,.84);
    // Preserve transparent PNG logos when feasible; large images are flattened
    // to white JPEG to stay within the documented 4 MB upload size.
    if(!output||output.size>4_194_304){
      ctx.globalCompositeOperation="destination-over";
      ctx.fillStyle="#ffffff";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      outputType="image/jpeg";
      output=await encode("image/jpeg",.78);
    }
    if(!output||output.size<1||output.size>4_194_304)
      throw Error("Please choose a smaller image (maximum 4 MB).");
    const filename=(file.name||"website-image")
      .replace(/\.[^.]+$/,"").replace(/[^a-zA-Z0-9_-]/g,"-").slice(0,75) ||
      "website-image";
    const extension=outputType==="image/png"?"png":"jpg";
    form.set("file",new File([output],filename+"."+extension,{type:outputType}));
    return form;
  } finally {
    URL.revokeObjectURL(blobURL);
  }
}
