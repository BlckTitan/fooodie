import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Alerts({message, id}: any){
    return toast.error(message, {position: 'top-right', autoClose: 15000, toastId: id});
}