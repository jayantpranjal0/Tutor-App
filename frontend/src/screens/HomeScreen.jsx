import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { Row,Button } from "react-bootstrap";
import course from "./temp.js";
const HomeScreen = () => {
  return (
    <>
      <Button href='/addCourse'>Teach a Course</Button>
      <Row>
        {course.map((course) => (
          <CourseCard
            course={{
              name: course.course_name,
              description: course.course_description,
              price: course.course_fee,
              image: course.course_image,
            }}
            key={course.course_id}
          />
        ))}
      </Row>
    </>
  );
};
export default HomeScreen;
