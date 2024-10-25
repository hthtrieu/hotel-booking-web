"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { GoogleIcon, FacebookIcon } from "./icons/CustomIcons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormInput } from "@/components/common/form/FormInput";
import Constants from "@/libs/Constants";
import Logo from "@/components/common/logo/Logo";
import { useDispatch } from "react-redux";
import { registerAction } from "@/store/auth/slice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

//eslint-disable-next-line
export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    phone_number: z.string(),
    password: z.string().min(6, {
      message: "Required",
    }),
    address: z.string(),
  });
  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
  });
  const submitForm = (values: any) => {
    dispatch(
      registerAction({
        data: {
          email: values?.email,
          password: values?.password,
          phone_number: values?.phone_number,
          name: values?.name,
          address: values?.address,
        },
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: () => {},
      })
    );
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        {/* <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        /> */}
        <Card variant="outlined">
          <Logo />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormInput
              control={control}
              fieldName="email"
              type={Constants.INPUT_TYPE.EMAIL}
              classNameWrapper="md:w-full"
              label="Email"
              placeholder="Enter your email"
              required={true}
            />
            <FormInput
              control={control}
              fieldName="phone_number"
              type={Constants.INPUT_TYPE.TEXT}
              classNameWrapper="md:w-full"
              label="Phone"
              placeholder="Enter your phone"
              required={true}
            />
            <FormInput
              control={control}
              fieldName="address"
              type={Constants.INPUT_TYPE.TEXT}
              classNameWrapper="md:w-full"
              label="Address"
              placeholder="Enter your address"
              required={true}
            />
            <FormInput
              control={control}
              fieldName="name"
              type={Constants.INPUT_TYPE.TEXT}
              classNameWrapper="md:w-full"
              label="User name"
              placeholder="Enter your name"
              required={true}
            />

            <FormInput
              control={control}
              fieldName="password"
              type={
                showPassword
                  ? Constants.INPUT_TYPE.TEXT
                  : Constants.INPUT_TYPE.PASSWORD
              }
              classNameWrapper="md:w-full"
              label="Password"
              placeholder="Enter your password"
              icon={
                !showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />
              }
              onClickIcon={() => {
                setShowPassword(!showPassword);
              }}
              required={true}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              //   onClick={validateInputs}
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span>
                <Link
                  href="/sign-in"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
