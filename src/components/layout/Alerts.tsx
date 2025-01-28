import React from 'react';
import { toast } from 'react-toastify';

export function AlertSuccess(message: any){
    return toast.success(
        message, 
        {position: 'top-right', autoClose: 3000, toastId: 1}
    );
}

export function AlertError(message: any){
    return toast.error(
        message, {position: 'top-right', autoClose: 3000, toastId: 2}
    );
}