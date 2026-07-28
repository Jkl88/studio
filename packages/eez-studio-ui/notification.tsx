import React from "react";

import {
    ToastContainer,
    toast,
    ToastOptions,
    UpdateOptions
} from "react-toastify";

import { t } from "eez-studio-shared/i18n";

export type ToastId = React.ReactText;

export function info(message: string, options?: ToastOptions) {
    return toast.info(t(message), options);
}

export function success(message: string, options?: ToastOptions) {
    return toast.success(t(message), options);
}

export function warn(message: string, options?: ToastOptions) {
    return toast.warn(t(message), options);
}

export function error(message: string, options?: ToastOptions) {
    return toast.error(t(message), Object.assign({ autoClose: false }, options));
}

export function update(toastId: ToastId, options: UpdateOptions) {
    return toast.update(toastId, options);
}

export function dismiss(toastId: ToastId) {
    toast.dismiss(toastId);
}

export const container = (
    <ToastContainer
        position={"top-right"}
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
    />
);

export const INFO = "info";
export const SUCCESS = "success";
export const WARNING = "warning";
export const ERROR = "error";

export type Type = typeof INFO | typeof SUCCESS | typeof WARNING | typeof ERROR;
export type ProgressId = ToastId;
