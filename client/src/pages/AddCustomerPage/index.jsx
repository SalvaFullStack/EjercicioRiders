import { Button, Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";
import customerService from "src/services/customer-service";
import { useForm } from "react-hook-form";

function AddCustomerPage() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (customer) => {
    customerService
      .create(customer)
      .then(() => reset())
      .catch((err) => {
        const { data, status } = err.response;
        if (status !== 400) return;

        {
          data.forEach(({ field, msg }) => {
            setError(
              field,
              { type: "response", message: msg },
              { shouldFocus: true }
            );
          });
        }
      });
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h2" component="h2">
        Añadir nuevo cliente
      </Typography>

      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={5}>
        <TextField
          id="name"
          label="Nombre"
          variant="outlined"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register("name", { required: "Nombre obligatorio" })}
        />
        <TextField
          id="latitude"
          label="Latitud"
          variant="outlined"
          type="number"
          error={Boolean(errors.latitude)}
          helperText={errors.latitude?.message}
          {...register("latitude", { required: "Latitud obligatoria" })}
        />
        <TextField
          id="longitude"
          name="longitude"
          label="Longitud"
          variant="outlined"
          type="number"
          error={Boolean(errors.longitude)}
          helperText={errors.longitude?.message}
          {...register("longitude", { required: "Longitud obligatoria" })}
        />

        <Button type="submit">Enviar</Button>
      </Stack>
    </Stack>
  );
}
export default AddCustomerPage;
