import React from 'react';

const ErrorPage = ( { error } ) => (
    <div style={{color: '#000000', textAlign:'center'}}>
            <div>X_X</div>
            {/* <span style={{color: '#ea4335'}}>System</span> is busy,
            <br/>please <span style={{color: '#4285f4'}}>try</span> again <span style={{color: '#34a853'}}>later</span> */}
            <div>{error}</div>
          </div>
  );

export default ErrorPage;