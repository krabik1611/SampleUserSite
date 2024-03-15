import { Navigate } from "react-router-dom";
import { IUser } from "../types/user";
import React, { useEffect, useState } from "react";

export const ProtectedRoute = ({
  user,
  children,
}: {
  user: IUser | null;
  children: React.ReactNode;
}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const ProtectedLogin = ({
  user,
  children,
}: {
  user: IUser | null;
  children: React.ReactNode;
}) => {
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
