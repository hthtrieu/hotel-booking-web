"use client"
import { FormInput } from "@/components/common/form/FormInput";
import Constants from "@/libs/Constants";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VietNamProvince } from "@/libs/VietNamProvinceData";
import OptionsBox from "./OptionsBox";
import DatePickerBox from "./DatePickerBox";
import { format } from "date-fns";
import { useRouter } from 'next/navigation'

const newDate = new Date();

const HotelSearchForm = () => {
    // const searchParams = useSearchParams();
    const router = useRouter();
    const formSchema = z.object({
        province: z.any({
            message: "Required"
        }), // provine object (code, name, label, ...)
        adult: z.number({
            message: "Required"
        }).min(1, {
            message: "Minimun is 1"
        }),
        children: z.number({
            message: "Required"
        }).min(0, {
            message: "Minimun is 0"
        }),
        room: z.number({
            message: "Required"
        }).min(1, {
            message: "Minimun is 1"
        }),
        date: z.object({
            startDate: z.string(),
            endDate: z.string(),
        })
        // date: z.any(),
    });
    const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            province: '',
            adult: 2,
            children: 0,
            room: 1,
            date: {
                startDate: format(newDate, 'yyyy-MM-dd'),
                endDate: format(newDate, 'yyyy-MM-dd'),
            }
        },
    });
    const submitForm = (values: any) => {
        console.log('submit values', values)
        const filter = {
            province: values?.province?.name,
            checkin: values?.date?.startDate,
            checkout: values?.date?.endDate,
            adult: values?.adult,
            children: values?.children,
            room: values?.room,
        }
        const queryParams = new URLSearchParams(filter).toString();
        router.push(`/search?${queryParams}`)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="flex flex-col md:flex-row border-yellow-500 w-full p-4 border-2 gap-4 items-end rounded-md justify-center">
                    <FormInput
                        type={Constants.INPUT_TYPE.AUTOCOMPLETE}
                        control={control}
                        fieldName="province"
                        placeholder="Choose city"
                        options={VietNamProvince}
                        getOptionLabel={(option) => option?.name || ''}
                        className="w-full"
                    />
                    <DatePickerBox control={control} />
                    <OptionsBox control={control} />
                    <Button className="w-full md:w-fit" type="submit" variant="contained" size="large">Search</Button>
                </div>
            </form>
        </div>
    )
}

export default HotelSearchForm
