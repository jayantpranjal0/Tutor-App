import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Card,Button } from 'react-bootstrap'
function CourseCard(props) {
    console.log(props.course.image)
  return (
    <>
        <Card className='my-3 mx-3 p-3 rounded' style={{ width: '280px' ,height:'400px'}} >
            <Card.Img src={props.course.image} variant='top' style={{ width: '240px' ,height:'200px'}} />
            <Card.Body>
                <Card.Title as='div'>
                    <strong>{props.course.name}</strong>
                </Card.Title>
                <Card.Text as='div'>
                    <Card.Text as='h6'>{props.course.description}</Card.Text>
                </Card.Text>
                <Card.Text as='h3'>Rs. {props.course.price}</Card.Text>
                <Button variant='primary' href='/course/${id}' className='me-3'>Course Detail</Button>
            </Card.Body>
        </Card>
    </>
  )
}

export default CourseCard
