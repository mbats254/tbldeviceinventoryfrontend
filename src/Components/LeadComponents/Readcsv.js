import React, { useState } from "react";
import Papa from "papaparse";
import axios from 'axios'
// import Headers from 'LayoutComponents/Headers'; 
import Headers from '../LayoutComponents/Headers'; 
import Sidebar from '../LayoutComponents/Sidebar'; 

import '../assets/bootstrap/css/bootstrap.min.css' 
import '../assets/fonts/font-awesome.min.css'
import '../assets/css/styles.css'
import '../assets/css/styles.min.css'
import '../assets/fonts/fontawesome-all.min.css'
import '../assets/fonts/fontawesome5-overrides.min.css'
import '../assets/bootstrap/css/bootstrap.min.css'  
import $ from 'jquery';
import { template } from '@babel/core'
import { withRouter  } from "react-router-dom";
import logo from '../assets/Images/TEMP.PNG';
// import {  XLSX } from "xlsx";
import * as XLSX from 'xlsx';

export default function ReadcsvFxn() {
    const [data, setData] = useState([]);
     
    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    const[userTeam, setTeam] = useState(localStorage.getItem('user_team'));
     
    // It will store the file uploaded by the user
    const [file, setFile] = useState("");
    const font16 = { fontSize: '20px' };
    const fontFamilyNunito = { fontFamily: 'Nunito, sans-serif' };
    const floatRight = { float: 'right' }
    const floatLeft = { float: 'left', display: 'none' }
    const displayHidden = { display: 'none' }
         const width100 = { width: '100%' }
    const autoscroll = { overflowY: 'auto'}
    const displayNone = { display: 'none' }
    const loadingStatus = false
    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        setError("");
         
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
             
          
            const fileExtension = inputFile?.type.split("/")[1];
            console.log(inputFile)
            if(inputFile['name'].split('.')[1] == "xlsx")
            {
               
        var fileReader = new FileReader();
      fileReader.readAsBinaryString(inputFile);
      fileReader.onload = function(e) {
 
          var data = e.target.result;
          var workbook = XLSX.read(data, {
              type : 'binary'
          });
          var result = {};
        //   console.log(workbook)
          workbook.SheetNames.forEach(function(sheetName) {
              var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
              if (roa.length > 0) {
                  result[sheetName] = roa;
              }
          });
        //   console.log(Object.keys(result['Sheet1'][0]))
        // loop 1:
          for(var i=0;i<result['Sheet1'].length;i++)
          {
                var requiredFields = [ "Email", "Full Name",  "Device Name", "Type" , "Brand", "Device Location",  "Serial Number"]
                var objectKeys = Object.keys(result['Sheet1'][i])
                // console.log(objectKeys)
                // if(objectKeys.some(r=> requiredFields.includes(r))){
                for(var j=0;j<objectKeys.length;j++)
                {
                    // console.log(objectKeys[i])
                    if(!requiredFields.includes(objectKeys[j]))
                    {
                        console.log(objectKeys)
                        $('.RequiredFields').fadeIn()
                        return;
                        // break;
                        // i=-1
                        // break;
                    }
               
               }
                     var data = result['Sheet1'][i]
                     data['UserTeam'] = userTeam
            //    console.log(data)
                 
                    // // console.log(data)
                    const headers = {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin':  '*'
                    }
                    axios.post("http://127.0.0.1:8000/inventory/post/excel/data/", data,  { headers: headers })
                        .then(res => {
                            console.log(res.data)  
                                            //    loadingStatus = true;
                        var excelData = res.data;
                            // console.log(excelData)
                    
                            })                        
                            .catch(error => {
                                console.log(error)
                            })
                // if(objectKeys.every(r=> requiredFields.includes(r)))
                // {
                //     
                // }
                // else
                // {
                //     console.log(objectKeys)
                // }
          }
        //   //displaying the json result
        //   var resultEle=document.getElementById("json-result");
        //   resultEle.value=JSON.stringify(result, null, 4);
        //   resultEle.style.display='block';
               

            }
           }
           else if(inputFile['name'].split('.')[1] == "csv")
           {
               setFile(inputFile);
               $('.parseData').fadeIn()
           }
            // if (!allowedExtensions.includes(fileExtension)) {
            //     setError("Please input a csv file");
            //     return;
            // }
 
            // If input type is correct set the state
            setFile(inputFile);
            
        }
    };
    const handleParse = (e) => {
         e.preventDefault();
         
        // If user clicks the parse button without
        // a file we show a error
        // if (!file) return setError("Enter a valid file");
 
        // Initialize a fileReader which allows user
        // to read any file or blob.
        const fileReader = new FileReader();
         
        // Event listener on fileReader when the file
        // loads, we parse it and set the data.
        fileReader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true, skipEmptyLines: true, });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            for(var i=0;i<parsedData.length;i++)
            {
                var requiredFields = [ "Full Name", "Email", "Device Name", "Type" , "Brand", "Device Location",  "Serial Number"]
                var objectKeys = Object.keys(parsedData)
                console.log(objectKeys)
                if(objectKeys.some(r=> requiredFields.includes(r)))
                for(var j=0;j<objectKeys.length;j++)
                {
                    if(!requiredFields.includes(objectKeys[j]))
                    {
                        console.log(objectKeys[j])
                        break;
                    }
                    else
                    {
                        var data = parsedData
                    // console.log(data)
                    const headers = {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin':  '*'
                    }
                    axios.post("http://127.0.0.1:8000/inventory/post/excel/data/", data,  { headers: headers })
                        .then(res => {  
                                               loadingStatus = true;
                        var excelData = res.data;
                            // console.log(excelData)
                    
                            })                        
                            .catch(error => {
                                console.log(error)
                            })
                    }
                }
            }
            console.log(csv)
            setData(columns);
        };
        fileReader.readAsText(file);
    };
 
    return (
        <div>
        <Headers/>
        {/* <Sidebar/> */}
        <main className='content-container'>

                    <div className="container p-2">
                        <form  encType="multipart/form-data">

                            <div className="col-md-12 font-weight-bold p-1">
                                <p className="text-capitalize" style={font16}>Upload Excel Data</p>
                            </div>


                            <div className="form-row pt-4">
                                
                                
                           
                                   
                      
                        <div className="col-md-12 p-2">
                                    <div className="py-1">
                                        <label className="text-capitalize" style={fontFamilyNunito}> Enter Excel File</label>
                                        <input htmlFor="csvInput"  onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File" className="form-control"  accept=".xlsx,.csv" required/>
                                    </div>
                                </div>
                                {loadingStatus ?
                                <div className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold "  style={floatLeft}>Loading</button></div>
                               : <div className="col col-6"><button className="btn btn-primary btn-warning rounded-pill px-5 font-weight-bold parseData" onClick={handleParse} style={floatLeft}>Submit</button></div>
                            }
                                </div>

            
           
            <div style={{ marginTop: "3rem" }}>
                {error ? error : data.map((col,
                  idx) => <div key={idx}>{col}</div>)}
            </div>
            </form>
            </div>
            </main>
            <div className="modal RequiredFields" role="dialog" tabindex="-1" id="modal-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header"><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                            <div className="modal-body">
                                <div className="card row flex-row pb-4 border rounded-2 shadow-sm">
                                    <div className="card-header py-3">
                                        <header className="text-center text-capitalize">
                                            <h1>Required Fields</h1>
                                        </header>
                                    </div>
                                    <div className="card-body" style={{display:'inline'}}>
                                      <h4><strong>Please make sure your excel has the following Title Heads before inputting it.</strong></h4>  
                                        <div className="row p-1">

                                            <div className="col">
                                                <h5>Full Name </h5>
                                            </div>
                                            
                                        </div>
                                      
                                        <div className="row p-1">
                                            <div className="col">
                                                <h5>Email </h5>
                                            </div>
                                        </div>
                                        <div className="row p-1">
                                            <div className="col">
                                                <h5>Device Name </h5>
                                            </div>
                                        </div>
                                        <div className="row p-1">
                                            <div className="col">
                                                <h5>Type</h5>
                                            </div>
                                        </div>
                                        <div className="row p-1">
                                            <div className="col">
                                                <h5> Brand </h5>
                                            </div>
                                        </div>
                                        <div className="row p-1">
                                            <div className="col">
                                                <h5>Device Location </h5>
                                            </div>
                                        </div>
                                        <div className="row p-1">
                                            <div className="col">
                                                <h5> Serial Number</h5>
                                            </div>
                                        </div>                                       
                                      
                                    </div>
                                </div>
                            </div>
                            {/* <div className="modal-footer p-3 justify-content-center row"><a className="btn btn-outline-dark btn-lg text-dark px-5 rounded-pill button-close">Close</a></div> */}
                        </div>
                    </div>
                </div>
        </div>
    );
};
 

