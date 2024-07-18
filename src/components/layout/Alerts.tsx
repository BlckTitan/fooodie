import React from 'react';
import { toast } from 'react-toastify';

export default function AlertsSuccess({message}: any){
    return toast.error(message, {position: 'top-right', autoClose: 3000, toastId: 1});
}

export function AlertsError({message}: any){
    return toast.error(message, {position: 'top-right', autoClose: 3000, toastId: 2});
}