"use client";

import React, { useState } from "react";
import * as R from 'ramda';
import axios from 'axios';
import { formatISO } from "date-fns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Theme, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

// ✅ Validation Schema
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  dateOfBirth: yup.date().required("Date of birth is required").nullable(),
  email: yup.string().email("Invalid email").required("Email is required"),
  cellNumber: yup
    .string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10–15 digits")
    .required("Phone number is required"),
  companyName: yup.string().required("Company name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  comments: yup.string().optional(),
});

type FormValues = yup.InferType<typeof schema>;

export default function AddClientForm() {
  const theme: Theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      dateOfBirth: null,
      email: "",
      cellNumber: "",
      companyName: "",
      price: 0,
      comments: "",
    },
  });

  // ✅ onSubmit handles backend communication
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setAlert(null);

      const dateFormatedData = R.evolve(
        {
          dateOfBirth: (initDateOfBirth: Date) => formatISO(initDateOfBirth, { representation: "date" }),
        },
        data
      );
      
      const url = `${process.env.NEXT_PUBLIC_API_URL}/clients`;
      const response = await axios.post(url, dateFormatedData);

      setAlert({ type: "success", message: "Client added successfully!" });
      reset(); // clear fields on success
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelStyle = {
    fontSize: "18px",
    fontWeight: 600,
    color: "primary.dark",
    mb: 1,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          px: theme.spacing(4),
          mx: theme.spacing(4),
          mt: theme.spacing(7),
          display: "flex",
          flexDirection: "column",
          gap: 7,
        }}
      >
        {/* ✅ Alert Section */}
        {/* <Collapse in={!!alert}>
          {alert && (
            <Alert
              severity={alert.type}
              onClose={() => setAlert(null)}
              sx={{ mb: 2 }}
            >
              {alert.message}
            </Alert>
          )}
        </Collapse> */}

        <Collapse in={!!alert}>
          {alert && (
            <Alert
              severity={alert.type}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alert.message}
            </Alert>
          )}
        </Collapse>

        {/* ================= Row 1 ================= */}
        <Grid container spacing={3}>
          {/* First Name */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>First Name</Typography>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  placeholder="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>

          {/* Last Name */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Last Name</Typography>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  placeholder="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>

          {/* Address */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Address</Typography>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  placeholder="Type your Address"
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* ================= Row 2 ================= */}
        <Grid container spacing={3}>
          {/* Date of Birth */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Date of Birth</Typography>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  slotProps={{
                    textField: {
                      variant: "standard",
                      fullWidth: true,
                      error: !!errors.dateOfBirth,
                      helperText: errors.dateOfBirth?.message,
                      disabled: isSubmitting,
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Contact Email */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Contact Email</Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  placeholder="Type your Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>

          {/* Contact Cell Number */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Contact Cell Number</Typography>
            <Controller
              name="cellNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  placeholder="Type your Cell No"
                  fullWidth
                  error={!!errors.cellNumber}
                  helperText={errors.cellNumber?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* ================= Row 3 ================= */}
        <Grid container spacing={3}>
          {/* Company Name */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Company Name</Typography>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  placeholder="Type here"
                  fullWidth
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>

          {/* Price */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Price</Typography>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  variant="standard"
                  placeholder="Please Select your Packages"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>

          {/* Comments */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Comments</Typography>
            <Controller
              name="comments"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  placeholder="Type your comment here"
                  fullWidth
                  error={!!errors.comments}
                  helperText={errors.comments?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </Grid>
        </Grid>

        {/* ================= Buttons ================= */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="outlined"
            disabled={isSubmitting}
            sx={{
              color: "black",
              borderColor: "black",
              px: 3,
            }}
          >
            Back
          </Button>

          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                px: 3,
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Submit
            </Button>

            {isSubmitting && (
              <CircularProgress
                size={24}
                color="primary"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
