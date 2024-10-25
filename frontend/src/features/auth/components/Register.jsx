import React from "react";
import { Button, Container, Input } from "components/ui";
import { useForm } from "react-hook-form";
// import { registerUser } from "../api/auth";
// import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "utils/toast";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const { mutate } = useMutation({
  //   mutationFn: registerUser,
  //   onSuccess: ({ data }) => {
  //     reset();
  //     successToast("greate");
  //   },

  //   onError: (error) => {
  //     errorToast("Something went Wrong!");
  //   },
  // });

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <div className="register-form">
      <Container>
        <p className="text-xl font-bold">Create Account</p>
        <div className="card-fields-container flex flex-col gap-y-3">
          <form onSubmit={handleSubmit(submitHandler)} className="mt-5">
            <Input
              label="Name"
              type="text"
              placeholder="Enter Name"
              className="mb-1"
              {...register("name", {
                // // required: "dob is required",
              })}
              error={errors.name?.message}
            />

            <Input
              label="Email"
              placeholder="Enter Email"
              className="mb-1"
              {...register("email", {
                // required: "name is required",
              })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter Password"
              className="mb-1"
              {...register("password", {
                // // required: "dob is required",
              })}
              error={errors.password?.message}
            />

            <button className="px-4 py-2 bg-yellow-500 rounded-lg text-white w-full mt-4">Register</button>
          </form>

          <div className="mt-2">
            <span>Already have an account?</span>
            <Link className="mx-2" to="/">
              Login
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
