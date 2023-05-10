import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TextInput } from "../input";

export interface ListingInputs {
  title: string;
  description: string;
  price: string;
  category: string;
}

export default function ListingForm({
  defaultTitle,
  defaultDescription,
  defaultPrice,
  setTitle,
  setDesctiption,
  setPrice,
  onSubmit,
}: {
  defaultTitle: string;
  defaultDescription: string;
  defaultPrice: string;
  setTitle: (s: string) => void;
  setDesctiption: (s: string) => void;
  setPrice: (s: string) => void;
  onSubmit: (data: ListingInputs) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ListingInputs>({
    criteriaMode: "all",
    defaultValues: {
      title: defaultTitle,
      price: defaultPrice,
      description: defaultDescription
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-10 w-80 mt-5">
        <TextInput
          reactFormProps={register("title", {
            required: "This is required.",
            minLength: {
              value: 5,
              message: "This input is too small.",
            },
            maxLength: {
              value: 100,
              message: "This input exceed maxLength.",
            },
          })}
          placeholder="Title"
          label="Title"
          type="text"
          setValueFromRoot={(v: string) => {
            v.trim().length === 0 ? setTitle("Your Title") : setTitle(v);
          }}
        ></TextInput>
      </div>
      <div className="h-10 w-80 mt-8">
        <TextInput
          reactFormProps={register("price", {
            required: "This is required.",
            valueAsNumber: true,
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: "Please enter a number",
            },
          })}
          placeholder="Price"
          label="Price"
          type="number"
          setValueFromRoot={setPrice}
        ></TextInput>
      </div>
      <div className="h-40 w-80 mt-8">
        <TextInput
          reactFormProps={register("description", {
            required: "This is required.",
            minLength: {
              value: 30,
              message: "This input is too small.",
            },
            maxLength: {
              value: 1000,
              message: "This input exceed maxLength.",
            },
          })}
          placeholder="Description"
          label="Description"
          type="textarea"
          setValueFromRoot={(v: string) => {
            v.trim().length === 0
              ? setDesctiption(defaultDescription)
              : setDesctiption(v);
          }}
        ></TextInput>
      </div>
      <input
        type="submit"
        value="Next"
        className="mt-10 bg-gradient px-10 py-2 text-white rounded-md cursor-pointer"
      />
    </form>
  );
}
