import React, { Component } from 'react';
import { SingleAwait } from '../../index'
class AwaitList extends Component {
  render() { 
    const urls = ["https://pbs.twimg.com/profile_images/1005956021087547393/RdD7s-Gb_400x400.jpg",'https://cdn.images.express.co.uk/img/dynamic/35/590x/Freddie-Mercury-final-pictures-1208447.jpg?r=1574537671789' ]
    return ( 
      <section className="section">
        <div className='container'>
          <h1 className="title is-1">Await</h1>
          <hr />
          {urls.map((url,index) => { 
            return <SingleAwait key={index} url={url} />
          })}
        </div>
      </section>

    );
  }
}
export default AwaitList;