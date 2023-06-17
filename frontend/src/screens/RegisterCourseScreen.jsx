import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const RegisterCourseScreen = () => {
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseImage, setCourseImage] = useState("");
  const [courseStartDate, setCourseStartDate] = useState("");
  const [courseEndDate, setCourseEndDate] = useState("");
  const [maximumCapacity, setMaximumCapacity] = useState(0);
  const [materialFee, setMaterialFee] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        // det={
        //     courseID,
        //     courseName,
        //     courseDescription,
        //     coursePrice,
        //     courseImage,
        //     courseStartDate,
        //     courseEndDate,
        //     maximumCapacity,
        //     materialFee,
        //   };
    //   const res = await registerCourse(det).unwrap();
    //     dispatch(registerCourse({ ...res }));
        // navigate('/');
      console.log(courseID);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Register Course</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="courseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="courseID">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course ID"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="courseDescription">
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course Description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="coursePrice">
          <Form.Label>Course Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course Price"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="courseImage">
          <Form.Label>Course Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course Image"
            value={courseImage}
            onChange={(e) => setCourseImage(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="courseStartDate">
          <Form.Label>Course Start Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course Start Date"
            value={courseStartDate}
            onChange={(e) => setCourseStartDate(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="courseEndDate">
          <Form.Label>Course End Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Course End Date"
            value={courseEndDate}
            onChange={(e) => setCourseEndDate(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="maximumCapacity">
          <Form.Label>Maximum Capacity</Form.Label>

          <Form.Control
            type="text"
            placeholder="Maximum Capacity"
            value={maximumCapacity}
            onChange={(e) => setMaximumCapacity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="materialFee">
          <Form.Label>Material Fee</Form.Label>
          <Form.Control
            type="text"
            placeholder="Material Fee"
            value={materialFee}
            onChange={(e) => setMaterialFee(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Register
        </Button>
      </Form>

      {isLoading && <Loader />}
    </FormContainer>
  );
};

export default RegisterCourseScreen;
