"use client";

import React from "react";
import { Box, Button, Grid, TextField, Typography, Stack } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// ✅ Validation Schema
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  dateOfBirth: yup.date().required("Date of birth is required").nullable(),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10–15 digits")
    .required("Phone number is required"),
  company: yup.string().required("Company name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  comments: yup.string().optional(),
});

type FormValues = yup.InferType<typeof schema>;

export default function AddClientForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      dateOfBirth: null,
      email: "",
      phone: "",
      company: "",
      price: "",
      comments: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("✅ Submitted Data:", data);
  };

  // ✅ Reusable field label style
  const labelStyle = {
    fontSize: "18px",
    fontWeight: 500,
    color: "primary.dark",
    mb: 1,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          px: "36px",
          mx: "36px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
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
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
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
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
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
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
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
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          {/* Contact Cell Number */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography sx={labelStyle}>Contact Cell Number</Typography>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
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
              name="company"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  fullWidth
                  error={!!errors.company}
                  helperText={errors.company?.message}
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
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
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
                  fullWidth
                  multiline
                  minRows={2}
                  error={!!errors.comments}
                  helperText={errors.comments?.message}
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
            sx={{
              color: "black",
              borderColor: "black",
              px: 3,
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            type="submit"
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
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
