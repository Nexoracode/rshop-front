import { useMutation } from "@tanstack/react-query";
import { requestOtp } from "./auth";

export const useRequestOtp = ({
  handleSuccess,
}: {
  handleSuccess: (variables: { identifier: string }) => void;
}) => {
  const { mutateAsync, isPending, isSuccess, variables } =
    useMutation(requestOtp);

  const handleSendOtp = ({ phone }: { phone: string }) => {
    mutateAsync(
      { identifier: phone },
      {
        onSuccess: (data, variables) => {
          if (data) handleSuccess(variables);
        },
      },
    );
  };

  return {
    handleSendOtp,
    isPending,
    isSuccess,
    variables,
  };
};
