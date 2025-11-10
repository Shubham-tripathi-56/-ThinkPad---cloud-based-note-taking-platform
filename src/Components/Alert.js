
import React from 'react';

// Alert component to display alert messages
export default function Alert(props) {
  
  // Function to capitalize the first letter of a word
  const capitalize = (word) => {
    /********* */
    if(word === 'danger'){
       word = 'error' 
    }

    /********* */
   // capitalize the first letter of a word
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div style={{ height: '50px' }}>
      {/* Check if there is an alert object */}
      {props.alert && (
        <div 
          className={`alert alert-${props.alert.type} alert-dismissible fade show`} 
          role="alert"
        >
          {/* Display the alert type in capitalized format and the alert message */}
          <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}

      
        </div>
      )}
    </div>
  );
}
