import React from 'react'
import {Link,useParams} from 'react-router-dom' 

function CourseScreen() {
    const {id} = useParams();
    console.log(id)
  return (
    <div>
      This page works
    </div>
  )
}

export default CourseScreen
