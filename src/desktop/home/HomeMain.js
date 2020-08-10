import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const HomeMain = ({history}) => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <div>
            Hi test
        </div>
    );
};