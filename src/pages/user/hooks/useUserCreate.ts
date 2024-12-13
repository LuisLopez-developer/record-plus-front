import { ApiServiceError } from "@/services/api/ApiErrorHandler";
import { useState } from "react";
import { toManagementCreationDto } from "../adapter/toManagementCreationDto";
import { UserManagementCreateValues } from "../models/userManagementCreateSchema";
import { createManagementUser } from "../service/userService";

export function useUserManagementCreate() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ApiServiceError | null>(null);

  const handleCreate = async (data: UserManagementCreateValues) => {
    setLoading(true);
    // llamar al servicio de creación de usuario
    try {
      await createManagementUser(toManagementCreationDto(data));
    } catch (error) {
      if (error instanceof ApiServiceError) {
        setError(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, handleCreate };
}
