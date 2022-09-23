import { useContext, useState } from 'react';
import { StoreContext, actions, infoField3, headerTable } from '../store'
import '../grid.css'

import './Contact.css'

function Contact() {
  const [buttonStatus, setButtonStatus] = useState("ADD");
  const [indexEdit, setIndexEdit] = useState();

  const [state, dispatch] = useContext(StoreContext);
  const { studentsInfo, inputInfo, searchResults, searchInfo } = state;

  const defaultInput = {};

  infoField3.forEach( e => {
    defaultInput[e] = ""
  })

  const handleAddOrUpdate = () => {
      let missField = true;

      for(let i of infoField3) {
        if(inputInfo[i] !== '')
          missField = false;
      }

      if(!missField){
        if(buttonStatus === "ADD") {
          dispatch(actions.addInfo(inputInfo));
        } else {
          dispatch(actions.editInfo(inputInfo, indexEdit));
          setButtonStatus("ADD");
        }
        dispatch(actions.setTableInput(defaultInput));
      } else {
        alert("Miss field!")
      }
       
  }

  const handleEdit = (studentInfo, index) => {
    setButtonStatus("UPDATE");
    dispatch(actions.setTableInput({...studentInfo}))
    setIndexEdit(index);
  }
  
  const handleSearch = (info) => {
    let noInputInfo = 0;

    for(let i of infoField3) {
      if(info[i] === '') {
        ++noInputInfo;
      }
    }

    if(noInputInfo == infoField3.length) {
      alert('Please enter information!');
    } else {
      const searchResults = studentsInfo.filter(studentInfo => {

          for(let i of infoField3) {
            if(info[i] === '') 
                continue;
            if(!studentInfo[i].includes(info[i])) {
                return 0; 
            }
          }

          return 1;
      })

      dispatch(actions.searchInfo(searchResults));
    }

    dispatch(actions.setSearchInput(defaultInput));
  }

  return (
    <div className='grid wide table'>
        <div className='row'>
    
            {infoField3.map((e, i) => (
              <h3 
                className='col l-2-4'
                key={i}
              >
                {headerTable[e]}
              </h3>
            )) }

            <h3 className='col l-2-4'>
              Options
            </h3>
        </div>
          
          {studentsInfo.map( (studentInfo, index) => (
            <div className='row' key={index}>
              {infoField3.map((e, i) => (
                <span 
                  className='col l-2-4'
                  key={i}
                >
                  {studentInfo[e]}
                </span>
              ))}
              <div className='col l-2-4'>
                <button
                  onClick={e => handleEdit(studentInfo, index)}
                >EDIT</button>
                <button
                  onClick = {() => dispatch(actions.deleteInfo(index))}
                >DELETE</button>
              </div>
            </div>
          ))}
        
          
          <div className='row'> 
            {infoField3.map((field, index) => 
                <div  
                  className='col l-2-4'
                  key={index}
                >
                  <input 
                    className='input_info'
                    value={inputInfo[field]}
                    onChange = {e => dispatch(actions.setTableInput({...inputInfo, [field]: e.target.value}))}
                  /> 
                </div>
            )}

            <div className='col l-2-4'>
              <button onClick={handleAddOrUpdate}>{buttonStatus}</button>
            </div>
          </div> 
      

      <div className='search'>
          <div className='row'>
              {infoField3.map((e, i) => (
                <h3 className='col l-2-4' 
                  key={i}
                >
                  {headerTable[e]}
                </h3>
              )) }
          </div>
          
          
          <div className='row'>
            {infoField3.map( (field, index) => (
              <div 
                className='col l-2-4' 
                key={index}
              >
                <input 
                  className='input_info'
                  value={searchInfo[field]}
                  onChange = {e => dispatch(actions.setSearchInput({...searchInfo, [field]: e.target.value}))}
                />
              </div>
            ))}

            <div className='col l-2-4'>
              <button onClick={() => handleSearch(searchInfo)}>SEARCH</button>
            </div>
          </div>
            
            {searchResults.map( (searchResult, index) => (
              <div 
                className='row' 
                key={index}
              >
                {infoField3.map((e, i) => (
                <span 
                  className='col l-2-4'
                  key={i}
                >
                    {searchResult[e]}
                </span>
                ))}
              </div>
            ))}
    
      </div>  
    </div>
  );
}

export default Contact;
