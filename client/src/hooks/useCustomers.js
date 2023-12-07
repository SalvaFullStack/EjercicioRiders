import { useEffect, useState } from "react";
import customerService from "src/services/customer-service";

function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    customerService
      .get()
      .then(({ data }) => {
        setCustomers(
          data.map((customer) => ({
            name: customer.name,
            latitude: customer.latitude,
            longitude: customer.longitude,
          }))
        );
      })
      .catch((errors) => {
        setErrors(errors);
      })
      .finally(() => setLoading(false));
  }, []);

  return { customers, loading, errors };
}

export default useCustomers;
