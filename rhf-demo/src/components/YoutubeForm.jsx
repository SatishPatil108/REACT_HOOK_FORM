import React,{ useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

const YoutubeForm = () => {
  const form = useForm({
    defaultValues: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/1`
      );

      const data = await response.json();
      return {
        username: "Robb Stark",
        email: data.email,
        channel: "",
        social: {
          facebook: "",
          instagram: "",
        },
        phoneNumbers: ["", ""],
        phNumbers: [{ number: '' }],
        age: 0,
        dob: new Date(),
      mode:"onBlur",
      };
    },
  });
  const { 
    register,
    control, 
    handleSubmit, 
    formState, 
    watch, 
    getValues, 
    setValue, 
    reset,
    trigger,
  } = form;

  const { 
    errors, 
    touchedFields, 
    dirtyFields, 
    isDirty, 
    isValid, 
    isSubmitting, 
    isSubmitted, 
    isSubmitSuccessful,
    submitCount,
   } = formState;

  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  // console.log({touchedFields, dirtyFields, isDirty, isValid });

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control
  })

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  const handleGetvalues = () => {
      console.log("Get values", getValues(["username", "email", "channel"]));
  }

  const handleSetvalue = () => {
      setValue("username","",{
        shouldValidate:true,
        shouldDirty:true,
        shouldTouch:true,
      });
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset();
    }
  },[isSubmitSuccessful,reset]);

  //  useEffect (() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  renderCount++;

  return (
    <div>
      <h1 style={{ fontSize: 20 }}>Youtube Form({renderCount / 2})</h1>
      {/* <h2>Watched value: {JSON.stringify(watchForm)} </h2> */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />

          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,

                message: "Invalid email format",
              },

              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a Different email address"
                  );
                },

                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not  supported!"
                  );
                },
              

                emailAvailable: async (fieldValue) => {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                );
                const data = await response.json();
                return data.length == 0 || "Email already exists";
                },
               
               },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel name is required",
              },
            })}
          />
           <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook", {
              // disabled: watch("channel") === "",
              required:{
                value:true,
                message:"Facebook Link is required",
              },
          })} />
           <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="instagram">Instagram</label>
          <input type="text" id="instagram" {...register("social.instagram",{
            required:{
              value:true,
              message:"Instagram Link is required",
            },
          })} />
           <p className="error">{errors.social?.instagram?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary phone number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0",{
              required:{
                value:true,
                message:"Primary phone number is required",
              },
            })}/>
           <p className="error">{errors.phoneNumbers?.[0]?.message}</p>

        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary phone number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1",{
              required:{
                value:true,
                message:"Secondary phone number is required",
              },
            })}/>
           <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <div>
            <label>List of phone numbers</label>
            <div>
              {
                fields.map((field, index) => {
                  return(
                  <div className="phonenum" key={field.id}>
                      <input type="text" {...register(`phNumbers.${index}.number`)}/>
                      {
                        index > 0 && (
                       <button className="btn_remove" type="button" onClick={ () => remove(index)}>Remove</button>
                     )                
                     }
                  </div>
                  );
                })
              }
              <button className="add_btn" type="button" onClick={() => append({ number: "" })}>Add Phone Number</button>
            </div>
        </div>

        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            className="age"
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber:true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
           <p className="error">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate:true,
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />
           <p className="error">{errors.dob?.message}</p>
        </div>

        <div className="btn_row">

        <button className="btn" disabled={ !isDirty || isSubmitting }>Submit</button>

        <button type="button" className="btn" onClick={() => reset()}>Reset</button>

        <button type="button" className="btn" onClick={handleGetvalues}>Get values</button>

        <button type="button" className="btn" onClick={handleSetvalue}>Set values</button>

        <button type="button" className="btn" onClick={()=> trigger("channel")}>Validate</button>

        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YoutubeForm;
