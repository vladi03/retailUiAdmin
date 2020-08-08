import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const HomeMain = ({history}) => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <div>
            Hi test
            {isAuthenticated &&
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.user_metadata && user.user_metadata.retailDomain}</p>
            </div>
            }
        </div>
    );
};