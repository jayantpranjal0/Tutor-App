import React from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button, Carousel } from "react-bootstrap";
function CourseScreen() {
  const courseDetails = {
    course_id: "C001",
    course_name: "Math",
    course_description: "Math",
    tutor: "T001",
    history: [],
    delivery_method: "Online",
    maxium_capacity: 10,
    course_fee: 100,
    material_fee: 10,
    course_image:
      "https://nordicapis.com/wp-content/uploads/What-Is-The-Difference-Between-Web-Services-and-APIs-.png",
    course_start_date: "2021-01-01",
    course_end_date: "2021-01-01",
    courseStudents: [],
    courseRequests: [],
  };
  const clickHandler=()=>{
    console.log("clicked");
  }
  return (
    <div>
      <div className=" py-5">
        <Container className="d-flex justify-content-center">
          <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
            <h1 className="text-center mb-4">{courseDetails.course_name} - {courseDetails.course_id} </h1>
            <p className="text-center mb-4">
              {courseDetails.course_description}
            </p>
            <img src={courseDetails.course_image} alt="course" className="w-50 mb-4" />
            <h5 className="d-flex  justify-content-left">Tutor- {courseDetails.tutor}</h5>
            <h5 className="d-flex  justify-content-left">Start Date- {courseDetails.course_start_date}</h5>
            <h5 className="d-flex  justify-content-left">End Date- {courseDetails.course_end_date}</h5>
            <h5 className="d-flex  justify-content-left">Delivery Method- {courseDetails.delivery_method}</h5>
            <h5 className="d-flex  justify-content-left">Seats Left- {courseDetails.maxium_capacity-courseDetails.courseStudents.length}</h5>
            <h5 className="d-flex  justify-content-left">Price- Rs. {courseDetails.course_fee}</h5>
            
            <div className="d-flex">
              <Button variant="primary" onClick={clickHandler} className="me-3">
                Sign Up for Course
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default CourseScreen;
