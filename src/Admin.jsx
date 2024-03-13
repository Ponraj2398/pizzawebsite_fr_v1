import { useState } from "react";
import Button from 'react-bootstrap/Button';
import './Admin.css';

function Admin() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [data, setData] = useState({
        valName: "",
        valPrice: "",
        valDescription: "",
        valImage:"",
    });
    const dataGiven = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const submitProduct = () => {
        const product = {
            name: data.valName,
            price: data.valPrice,
            description: data.valDescription,
            image: data.valImage
        }
        fetch("http://localhost:8080/product/set", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(product)
        }).then(response => {
            console.log("Data Received " + response)
        })

    }
    const handleFile = () => {
        console.log("hello world")
        const formData = new FormData();
        formData.append("file", selectedImage);
    
        fetch("http://localhost:8080/file/upload", {
            method: 'POST',
            body: formData,
            dataType: "jsonp"
        })
        .then(response => response.text())
        .then(text => {
            data.valImage = text
            console.log(text)
        })
      }
    return (
        <div>
            <div className="ad">
                <h1 className="text-center">Add a Product</h1>
                <div className="pr"><h3>Product Name: </h3><input type="text" name="valName" value={data.valName} onChange={dataGiven} style={{ border: '2px solid black' }} /></div> <br></br>
                <div className="pr"><h3>Product Description : </h3><input type="text" name="valDescription" style={{ border: '2px solid black' }} value={data.valDescription} onChange={dataGiven} /></div> <br></br>
                <div className="pr"><h3>Product Price : </h3><input type="text" name="valPrice" value={data.valPrice} onChange={dataGiven} style={{ border: '2px solid black' }} /></div> <br></br>
                <div className="pr">
                    <div>
                        {selectedImage && (
                            <div className="text-center">
                                <img
                                    alt="not found"
                                    width={"200px"}
                                    height={"270px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <br />
                                <Button variant="danger" onClick={() => setSelectedImage(null)}>Remove</Button>&nbsp;&nbsp;
                                <Button variant="warning" onClick={handleFile}>Upload</Button>
                            </div>
                        )}
                        <br />
                        <br />

                        <input
                            type="file"
                            name="myImage"
                            value={data.valImage}
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                    </div>
                </div>
                {/* <input type="button" value="Add Product"  /> */}
                <div className="text-center"><Button variant="danger" onClick={submitProduct}>Add Product</Button></div>
            </div>
        </div>
    );
}

export default Admin;