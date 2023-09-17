import React from 'react'

const Post = () => {
  return (
        <div className="post">
    <div className="image">
    <img src="https://techcrunch.com/wp-content/uploads/2023/03/GettyImages-1180708314-e1679675797562.jpg?w=1390&crop=1" alt="image1"/>
    </div>
    <div className="text">
    <h2>Web3 adoption could come via the enterprise, but the real boom will be through</h2>
    <p className="info">
     <a href="/" className="author" >  john cena </a>
     <time>2023-01-6 14</time>
    </p>
      <p className="summary">As the race for enterprise adoption in web3 accelerates, some people believe it’s not one-sided growth, but a journey where both mainstream enterprises and crypto startups can bring on new opportunities.</p>
    </div>
   </div>
  )
}

export default Post