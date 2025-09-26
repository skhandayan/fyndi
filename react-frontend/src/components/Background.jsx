import React from 'react'
import Ballpit from './Ballpit'

const Background = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"> 
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">
        <Ballpit
          count={20}
          gravity={0.001}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={false}
        />
      </div>
    </div>
    
  )
}

export default Background