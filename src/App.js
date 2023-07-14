import React from "react";
import { useForm, } from "react-hook-form";

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./form.css"

function App() {

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
   
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container fluid className="bg-linear">
      <Row className="bg-w mx-auto">
        <Col >
          <h2 className="title text-center">Form</h2>
          <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-control">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <p className="errorMsg">Email is required.</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="errorMsg">Email is not valid.</p>
                )}
              </div>

              <div className="form-control">
                <label>Password</label>
                <input
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    validate: {
                      checkLength: (value) => value.length >= 6,
                      matchPattern: (value) =>
                        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                          value)
                    }

                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="errorMsg">Password is required.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p className="errorMsg">
                    Password should be at-least 6 characters.
                  </p>
                )}
                {errors.password?.type === "matchPattern" && (
                  <p className="errorMsg">
                    Password should contain at least one uppercase letter, lowercase
                    letter, digit, and special symbol.
                  </p>
                )}
              </div>


              <div className="form-control">
                <label>Confirm Password</label>
                <input {...register("confirmPassword", {
                  required: "Confirm Password is required.",
                  validate: (match) => {
                    const password = getValues("password")
                    return match === password || "Password And Confirm password should Same!"
                  }
                })} type="password" id="confirmPassword" />


                <p className="errorMsg">{errors.confirmPassword?.message}</p>
              </div>

              <div className="form-control">

                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Check
                    inline
                    type="radio"
                    label="Male"
                    value="male"
                    {...register("gender", {
                      required: "Please select your gender"
                    })}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    value="female"
                    {...register("gender")}
                  />
                  {errors.gender && <p className="errorMsg">{errors.gender.message}</p>}
                </Form.Group>
              </div>


              <div className="form-control">
                <Form.Group className="mb-3" controlId="skills">
                  <Form.Label>Select Your Skills</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="JavaScript"
                    value="JavaScript"
                    {...register("skills", {
                      required: "Please select at-least one skill"
                    })}
                  />
                  <Form.Check

                    type="checkbox"
                    label="React"
                    value="react"
                    {...register("skills")}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Node.js"
                    value="nodejs"
                    {...register("skills")}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Angular"
                    value="angular"
                    {...register("skills")}
                  />
                  {errors.skills && <p className="errorMsg">{errors.skills.message}</p>}
                </Form.Group>
              </div>

             
           
              <div className="form-control">
              
                <button type="submit">SUBMIT</button>
              </div>

            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;