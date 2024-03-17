import { useState } from "react";

const QRCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQRdata] = useState("");
  const[qrSize,setQRSize] = useState("");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console.error("Error Generating QR Code", error);
    } finally {
      setLoading(false);
    }
  }
  async function downloadQR() {
    fetch(img)
      .then((response)=>response.blob())
      .then((blob)=>{
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QRCode.png";
        document.body.appendChild(link);
        link.click();
        // document.body.removeChild(link);
      })
      .catch((error)=>{
        console.error("Error Downloading QR Code ",error);
      })
      .finally(document.body.removeChild(link));
  }

  return (
    <>
      <div className="app-container">
        <h1>QR Code Generator</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} alt="Loading..." className="qrName" />}
        <div>
          <label htmlFor="dataInput" className="input-label">
            Data for QR code
          </label>
          <input
            type="text"
            value={qrData}
            id="dataInput"
            className="input-label"
            placeholder="Enter data for QR code"
            onChange={(e)=>{setQRdata(e.target.value)}}
          />
          <label htmlFor="sizeInput" className="input-label">
            Image Size (e.g., 150)
          </label>
          <input
            type="text"
            value={qrSize}
            id="sizeInput"
            placeholder="Enter the image Size"
            onChange={(e)=>{setQRSize(e.target.value)}}
          />
          <div className="btn">
            <button className="generate-button" disabled={loading} onClick={generateQR}>
              Generate QR Code{" "}
            </button>
            <button className="download-button" onClick={downloadQR}>Download QR Code </button>
          </div>
        </div>
        <p className="signed">
          Designed By{" "}
          <a href="https://www.vishnuram.neocities.org">Ram Kumar S</a>
        </p>
      </div>
    </>
  );
};

export default QRCode;
