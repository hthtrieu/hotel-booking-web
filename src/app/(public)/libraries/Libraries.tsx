"use client"
import { FormInput } from "@/components/common/form/FormInput";
import Constants from "@/libs/Constants";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const Libraries = () => {
    const formSchema = z.object({
        username: z.string().min(2, {
            message: 'Required',
        }),
        password: z.string().min(6, {
            message: 'Required',
        }),
        age: z.number({
            message: "Required"
        }),
        agree: z.boolean().optional(),
        description: z.string().optional(),
        gender: z.string({
            message: "Required"
        }),
    });
    const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
            // age: 1,
            agree: false,
        },
    });
    const submitForm = (values: any) => {
        console.log('submit values', values)
    }
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-2">
                <FormInput
                    control={control}
                    fieldName="username"
                    type={Constants.INPUT_TYPE.TEXT}
                    label="User name"
                    placeholder="Enter user name"
                    required={true}
                />
                <FormInput
                    control={control}
                    fieldName="password"
                    type={Constants.INPUT_TYPE.PASSWORD}
                    label="Password"
                    placeholder="Enter you password"
                />
                <FormInput
                    control={control}
                    fieldName="age"
                    type={Constants.INPUT_TYPE.SELECT}
                    label="Age"
                    options={[
                        { key: 1, label: 1 },
                        { key: 2, label: 2 }

                    ]}
                />
                <FormInput
                    control={control}
                    fieldName="agree"
                    type={Constants.INPUT_TYPE.CHECKBOX}
                    labelCheckbox="Agree with term"
                />
                <FormInput
                    control={control}
                    fieldName="description"
                    type={Constants.INPUT_TYPE.TEXTAREA}
                    label="Description"
                    placeholder="Description yourself"
                />
                <FormInput
                    control={control}
                    fieldName="gender"
                    type={Constants.INPUT_TYPE.RADIO}
                    label="Gender"
                    options={[
                        { key: 1, label: 'Female' },
                        { key: 0, label: 'Male' }
                    ]}

                />
                <Button type="submit" variant="contained">Submit</Button>
            </div>
        </form>
    )
}
