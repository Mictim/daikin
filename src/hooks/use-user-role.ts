import { Role } from "@prisma/client";
import { useEffect, useState } from "react";

export function useUserRole() {
    const [role, setRole] = useState<Role>(Role.USER);
    useEffect(() => {
        async function fetchUserRole() {
            try {
                const response = await fetch('/api/user/role');
                const data = await response.json();
                setRole(data.role);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        }
        fetchUserRole();
    }, [])
    return role;
};