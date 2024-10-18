"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IForm {
  name: string;
  email: string;
  age: number;
}

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
    alert("Form submitted successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-md">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="age" className="block mb-2">
          Age
        </label>
        <input
          id="age"
          type="number"
          {...register("age", {
            required: "Age is required",
            min: {
              value: 18,
              message: "You must be at least 18 years old",
            },
          })}
          className="border rounded p-2 w-full"
        />
        {errors.age && (
          <span className="text-red-500">{errors.age.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
