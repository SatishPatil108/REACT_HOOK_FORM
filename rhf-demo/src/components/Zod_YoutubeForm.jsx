import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";

const schema = z.object({
  username: z.string().nonempty("Username is Required"),
  email: z
    .string()
    .nonempty("Email is Required")
    .email("Email format is not valid"),
  channel: z.string().nonempty("Channel is Required"),
});

const Zod_YoutubeForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      <h1 style={{ fontSize: 20 }}>Zod Youtube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button className="btn">Submit</button>

      </form>
      <DevTool control={control} />

    </div>
  );
};
export default Zod_YoutubeForm;
