import { AxiosError } from "axios";
import Router from "next/router";
import { useAuth } from "../helpers";

type AnyFunction = (...args: any[]) => any;

interface ExpiredTokenError extends Omit<AxiosError, 'code'> {
    code: "422"
}

const wrapper = <Func extends AnyFunction>(
  fn: Func
): ((...args: Parameters<Func>) => Promise<ReturnType<Func>|void>) => {
  const wrappedFn = async (...args: Parameters<Func>): Promise<ReturnType<Func>|void> => {
    try {
      const funcResp = await fn(...args);
      return funcResp;
    } catch (e) {
        let axiosError = e as AxiosError
        if(axiosError && axiosError.response && axiosError.response.status && axiosError.response.data){
            if(axiosError.response.status == 422 && axiosError.response.data.detail == "Signature has expired"){
                window.location.href = 'logout';
            }else{
                throw e
            }
        }else{
            throw e
        }
    }
  };
  return wrappedFn;
};

export default wrapper;
