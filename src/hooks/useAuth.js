import { useContext } from "react";
import { AuthContext } from "../authContext/AuthProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
