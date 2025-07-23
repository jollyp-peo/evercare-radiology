// src/utils/convertDicom.js
import * as dicomParser from "dicom-parser";

export const convertDicomToPng = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);
    const dataSet = dicomParser.parseDicom(byteArray);

    const pixelDataElement = dataSet.elements.x7fe00010;
    if (!pixelDataElement) throw new Error("No pixel data found");

    const width = dataSet.uint16('x00280011'); // Columns
    const height = dataSet.uint16('x00280010'); // Rows
    const pixelArray = new Uint8Array(
      dataSet.byteArray.buffer,
      pixelDataElement.dataOffset,
      pixelDataElement.length
    );

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);

    for (let i = 0; i < pixelArray.length; i++) {
      const val = pixelArray[i];
      imageData.data[i * 4 + 0] = val;
      imageData.data[i * 4 + 1] = val;
      imageData.data[i * 4 + 2] = val;
      imageData.data[i * 4 + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);

    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  } catch (error) {
    console.error("DICOM conversion failed:", error);
    return null;
  }
};
