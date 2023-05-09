import React, { useState } from 'react'
import QRCode from 'react-qr-code';
import $ from 'jquery';

export default function (props) {
    console.log(props)
    const [value, setValue] = useState(props.data);
    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(256);
    const displayHidden = { display: 'none' }
    // alert(this.props)

  return (
    <div className="App">
    <center>
      <br />
      <br />
      <label>QR Value</label>
      <input
        type="text"
        className='form-control'
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value of Qr-code" value={props.data} readOnly
      />
      <br />
      <br />
      <div style={displayHidden}>
      <input
        type="text"
        onChange={(e) => setBack(e.target.value)}
        placeholder="Background color"
      />
      <br />
      <br />
      <input
        type="text"
        onChange={(e) => setFore(e.target.value)}
        placeholder="Foreground color"
      />
      <br />
      <br />
      <input
        type="number"
        onChange={(e) => setSize(parseInt(e.target.value === 
                         '' ? 0 : e.target.value, 10))}
        placeholder="Size of Qr-code"
      />
      </div>
      <br />
      <br />
      <br />
      <div className='QRCode'>
      {value && (
        <QRCode
          title={props.title}
          value={value}
          bgColor={back}
          fgColor={fore}
          size={size === '' ? 0 : size}
        />
      )}
      </div>
    </center>
  </div>
  )
}
