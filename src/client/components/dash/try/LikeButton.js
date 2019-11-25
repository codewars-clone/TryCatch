import React from 'react'
const LikeButton = ({ renderSplash }) => {
  return ( 
    <div className="buttons is-right">
      <button className='button is-success' onClick={()=> {renderSplash()}}>
        <i class="far fa-heart"></i>
      </button>  
    </div>
  );
}

export default LikeButton;