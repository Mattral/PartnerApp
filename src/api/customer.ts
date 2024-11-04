import { mutate } from 'swr';
import { useMemo } from 'react';

// types
import { CustomerList, CustomerProps } from 'types/customer';

// Sample predefined customer data
const predefinedCustomers: CustomerList[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', contact: '1234567890', age: 30, country: 'USA', status: 1, avatar: 1, fatherName: 'smith',  role: "Manager" , orders:0, progress:50 ,orderStatus:"pending", location: "CA", about: "meme", time: ["11AM"], date: "28", gender:'Gender.MALE', firstName:"mike", lastName:"smith" , skills: ["Insurance Law"]},
  { id: 2, name: 'Lorem Ipsum', email: 'Lorem@example.com', contact: '1234567890', age: 30, country: 'USA', status: 1, avatar: 1, fatherName: 'Lorem',  role: "Lawyer" , orders:0, progress:50 ,orderStatus:"pending", location: "CA", about: "meme", time: ["11AM"], date: "28", gender:'Gender.MALE', firstName:"mike", lastName:"smith" , skills: ["Tax Law"]}
  //{ id: 2, name: 'Jane Smith', email: 'jane@example.com', contact: '0987654321', age: 25, country: 'UK', status: 2 },
  // Add more customers as needed
];

const initialState: CustomerProps = {
  modal: false,
};

export const endpoints = {
  key: 'api/customer',
  list: '/list', // Not used anymore
  modal: '/modal', // Not used anymore
  insert: '/insert', // Not used anymore
  update: '/update', // Not used anymore
  delete: '/delete', // Not used anymore
};

export function useGetCustomer() {
  // Use the predefined data directly
  const data = { customers: predefinedCustomers };
  const isLoading = false;
  const error = null;
  const isValidating = false;

  const memoizedValue = useMemo(
    () => ({
      customers: data.customers as CustomerList[],
      customersLoading: isLoading,
      customersError: error,
      customersValidating: isValidating,
      customersEmpty: !isLoading && !data.customers.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function insertCustomer(newCustomer: CustomerList) {
  // Update local state based on the key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer: any) => {
      newCustomer.id = (currentCustomer.customers.length > 0 ? currentCustomer.customers[currentCustomer.customers.length - 1].id : 0) + 1;
      const addedCustomer: CustomerList[] = [...currentCustomer.customers, newCustomer];

      return {
        ...currentCustomer,
        customers: addedCustomer,
      };
    },
    false
  );
}

export async function updateCustomer(customerId: number, updatedCustomer: CustomerList) {
  // Update local state based on the key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer: any) => {
      const newCustomer: CustomerList[] = currentCustomer.customers.map((customer: CustomerList) =>
        customer.id === customerId ? { ...customer, ...updatedCustomer } : customer
      );

      return {
        ...currentCustomer,
        customers: newCustomer,
      };
    },
    false
  );
}

export async function deleteCustomer(customerId: number) {
  // Update local state based on the key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer: any) => {
      const nonDeletedCustomer = currentCustomer.customers.filter((customer: CustomerList) => customer.id !== customerId);

      return {
        ...currentCustomer,
        customers: nonDeletedCustomer,
      };
    },
    false
  );
}

export function useGetCustomerMaster() {
  const data = initialState; // Use the initial state directly
  const isLoading = false; // No loading state since we're not fetching

  const memoizedValue = useMemo(
    () => ({
      customerMaster: data,
      customerMasterLoading: isLoading,
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerCustomerDialog(modal: boolean) {
  // Update local state based on key
  mutate(
    endpoints.key + endpoints.modal,
    (currentCustomermaster: any) => {
      return { ...currentCustomermaster, modal };
    },
    false
  );
}

/*
import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// utils
import { fetcher } from 'utils/axios';

// types
import { CustomerList, CustomerProps } from 'types/customer';

const initialState: CustomerProps = {
  modal: false
};

export const endpoints = {
  key: 'api/customer',
  list: '/list', // server URL
  modal: '/modal', // server URL
  insert: '/insert', // server URL
  update: '/update', // server URL
  delete: '/delete' // server URL
};

export function useGetCustomer() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.list, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      customers: data?.customers as CustomerList[],
      customersLoading: isLoading,
      customersError: error,
      customersValidating: isValidating,
      customersEmpty: !isLoading && !data?.customers?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function insertCustomer(newCustomer: CustomerList) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer: any) => {
      newCustomer.id = currentCustomer.customers.length + 1;
      const addedCustomer: CustomerList[] = [...currentCustomer.customers, newCustomer];

      return {
        ...currentCustomer,
        customers: addedCustomer
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { newCustomer };
  //   await axios.post(endpoints.key + endpoints.insert, data);
}

export async function updateCustomer(customerId: number, updatedCustomer: CustomerList) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer: any) => {
      const newCustomer: CustomerList[] = currentCustomer.customers.map((customer: CustomerList) =>
        customer.id === customerId ? { ...customer, ...updatedCustomer } : customer
      );

      return {
        ...currentCustomer,
        customers: newCustomer
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { list: updatedCustomer };
  //   await axios.post(endpoints.key + endpoints.update, data);
}

export async function deleteCustomer(customerId: number) {
  // to update local state based on key
  mutate(
    endpoints.key + endpoints.list,
    (currentCustomer: any) => {
      const nonDeletedCustomer = currentCustomer.customers.filter((customer: CustomerList) => customer.id !== customerId);

      return {
        ...currentCustomer,
        customers: nonDeletedCustomer
      };
    },
    false
  );

  // to hit server
  // you may need to refetch latest data after server hit and based on your logic
  //   const data = { customerId };
  //   await axios.post(endpoints.key + endpoints.delete, data);
}

export function useGetCustomerMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.modal, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      customerMaster: data,
      customerMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerCustomerDialog(modal: boolean) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.modal,
    (currentCustomermaster: any) => {
      return { ...currentCustomermaster, modal };
    },
    false
  );
}
*/